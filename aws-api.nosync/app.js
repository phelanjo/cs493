const express = require('express');
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');
const _ = require('lodash');

const app = express();
const port = 8080;

// Borrowed from here - https://stackoverflow.com/a/56787535/9487966
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  // https://stackoverflow.com/a/58320564/9487966
  res.header('Set-Cookie', 'HttpOnly;Secure;SameSite=None');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

function parsePath(fp) {
  return _.map(fp, s3Object => {
    const pathParts = s3Object.Key.split('/');
    switch (pathParts.length) {
      case 1:
        return { song: pathParts[0] };
      case 2:
        return { song: pathParts[1], album: pathParts[0] };
      case 3:
        return {
          song: pathParts[2],
          album: pathParts[1],
          artist: pathParts[0]
        };
      default:
        return;
    }
  });
}

app.use(bodyParser.json());

app.get('/', (req, res) => {
  const s3 = new AWS.S3();
  const params = {
    Bucket: 'phelanjo-hw6-bucket'
  };
  s3.listObjectsV2(params)
    .promise()
    .then(s3Res => {
      const files = parsePath(s3Res.Contents);
      res.send(files);
    })
    .catch(err => {
      console.log(err);
      return Promise.reject(err);
    });
});

function getSignedUrl(key) {
  const s3 = new AWS.S3();
  const params = {
    Bucket: 'phelanjo-hw6-bucket',
    Key: key
  };
  return s3.getSignedUrlPromise('getObject', params);
}

function scanDynamo(params) {
  const documentClient = new AWS.DynamoDB.DocumentClient({
    region: 'us-east-1'
  });

  return documentClient.scan(params).promise();
}

function queryDynamo(params) {
  const documentClient = new AWS.DynamoDB.DocumentClient({
    region: 'us-east-1'
  });

  return documentClient.query(params).promise();
}

function putDynamo(params) {
  const documentClient = new AWS.DynamoDB.DocumentClient({
    region: 'us-east-1'
  });

  return documentClient.put(params).promise();
}

app.get('/genres', (req, res) => {
  const params = {
    TableName: 'music',
    AttributesToGet: ['genre']
  };

  scanDynamo(params)
    .then(items => {
      if (items.Count < 1) {
        return res.status(404).send('No genres found');
      }
      return res
        .status(200)
        .send(_.uniq(_.map(items.Items, item => item.genre)));
    })
    .catch(err => {
      return res.status(500).send(err);
    });
});

app.get('/artists/for/genre', (req, res) => {
  const genre = req.query.genre;

  const params = {
    TableName: 'music',
    KeyConditionExpression: 'genre = :genre',
    ExpressionAttributeValues: {
      ':genre': genre
    }
  };

  queryDynamo(params)
    .then(items => {
      if (items.Count < 1) {
        return res.status(404).send(`No artists found for the ${genre} genre`);
      }
      return res
        .status(200)
        .send(_.uniq(_.map(items.Items, item => item.artist)));
    })
    .catch(err => {
      return res.status(500).send(err);
    });
});

app.get('/albums/for/artist', (req, res) => {
  const artist = req.query.artist;

  const params = {
    TableName: 'music',
    IndexName: 'artist-album',
    KeyConditionExpression: 'artist = :artist',
    ExpressionAttributeValues: {
      ':artist': artist
    }
  };

  queryDynamo(params)
    .then(items => {
      if (items.Count < 1) {
        return res.status(404).send(`No albums found for ${artist}`);
      }
      return res
        .status(200)
        .send(_.uniq(_.map(items.Items, item => item.album)));
    })
    .catch(err => {
      return res.status(500).send(err);
    });
});

app.get('/songs/for/album', (req, res) => {
  const album = req.query.album;

  const params = {
    TableName: 'music',
    IndexName: 'album-song',
    KeyConditionExpression: 'album = :album',
    ExpressionAttributeValues: {
      ':album': album
    }
  };

  queryDynamo(params)
    .then(items => {
      if (items.Count < 1) {
        return res.status(404).send(`No songs found for the album "${album}"`);
      }
      return res
        .status(200)
        .send(_.uniq(_.map(items.Items, item => item.song)));
    })
    .catch(err => {
      return res.status(500).send(err);
    });
});

app.get('/song', (req, res) => {
  const song = req.query.song;

  const params = {
    TableName: 'music',
    FilterExpression: 'song = :song',
    ExpressionAttributeValues: {
      ':song': song
    }
  };

  scanDynamo(params)
    .then(items => {
      if (items.Count < 1) {
        return res.status(404).send(`The song "${song}" was not found`);
      }
      return getSignedUrl(
        `${items.Items[0].artist}/${items.Items[0].album}/${items.Items[0].song}.mp3`
      );
    })
    .then(url => {
      return res.status(200).send({ url });
    })
    .catch(err => {
      return res.status(500).send(err);
    });
});

app.post('/save-user', (req, res) => {
  const params = {
    Item: {
      display_name: req.body.display_name,
      email: req.body.email,
      user_id: req.body.user_id
    },
    TableName: 'music'
  };

  putDynamo(params)
    .then(result => {
      return result.status(200).send(result);
    })
    .catch(err => {
      return res.status(500).send(err);
    });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

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

app.post('/', (req, res) => {
  const s3 = new AWS.S3();
  const params = {
    Bucket: 'phelanjo-hw6-bucket',
    Key: _.get(req, 'body.key')
  };
  s3.getSignedUrlPromise('getObject', params)
    .then(url => {
      console.log({ url });
      res.status(200).send({ url });
    })
    .catch(err => {
      console.log({ err });
      res.status(400).send({ err });
    });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

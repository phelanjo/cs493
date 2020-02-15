const express = require('express');
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');
const _ = require('lodash');

const app = express();
const port = 4444;

var sts = new AWS.STS({
  region: 'us-east-1'
});

var roleToAssume = {
  RoleArn: 'arn:aws:iam::314587419725:role/s3-full-access',
  RoleSessionName: 'phelanjoHW9'
};

// Borrowed from here - https://stackoverflow.com/a/56787535/9487966
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST');
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

sts.assumeRole(roleToAssume, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    AWS.config.update({
      accessKeyId: data.Credentials.AccessKeyId,
      secretAccessKey: data.Credentials.SecretAccessKey,
      sessionToken: data.Credentials.SessionToken
    });
  }

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
    const url = s3.getSignedUrl('getObject', params);
    res.status(200).send({ url });
  });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

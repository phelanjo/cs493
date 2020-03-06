"use strict";
const AWS = require("aws-sdk");

module.exports.save_user = (event, context, callback) => {
  const reqBody = JSON.parse(event.body);
  const uid = reqBody.user_id;
  const email = reqBody.email;
  const display_name = reqBody.display_name;

  const dynamo = new AWS.DynamoDB.DocumentClient();

  const params = {
    Item: {
      user_id: uid,
      email,
      display_name
    },
    TableName: "users"
  };

  return dynamo
    .put(params)
    .promise()
    .then(res => {
      callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify({
          message: `Successfully saved user with email: ${email}`
        })
      });
    })
    .catch(err => {
      console.log(err);
      callback(null, {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify({
          message: `Unable to save user with email: ${email}`
        })
      });
    });
};

module.exports.add_to_playlist = (event, context, callback) => {
  const reqBody = JSON.parse(event.body);
  const uid = reqBody.user_id;
  const artist_album_song = reqBody.artist_album_song;

  // const dynamo = new AWS.DynamoDB.DocumentClient();

  // const params = {
  //   Item: {
  //     artist_album_song,
  //     user_id: uid
  //   },
  //   TableName: "users"
  // };

  console.log(event);

  callback(null, {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify({
      message: `Successfully added ${artist_album_song} to playlist for user: ${uid}`
    })
  });

  // return dynamo
  //   .put(params)
  //   .promise()
  //   .then(res => {
  //     callback(null, {
  //       statusCode: 200,
  //       headers: {
  //         "Access-Control-Allow-Origin": "*",
  //         "Access-Control-Allow-Credentials": true
  //       },
  //       body: JSON.stringify({
  //         message: `Successfully added ${artist_album_song} to playlist`
  //       })
  //     });
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     callback(null, {
  //       statusCode: 500,
  //       headers: {
  //         "Access-Control-Allow-Origin": "*",
  //         "Access-Control-Allow-Credentials": true
  //       },
  //       body: JSON.stringify({
  //         message: `Unable to add ${artist_album_song} to playlist`
  //       })
  //     });
  //   });
};

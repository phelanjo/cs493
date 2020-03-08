const AWS = require("aws-sdk");

exports.handler = async event => {
  const SQS_ENDPOINT =
    "https://sqs.us-east-1.amazonaws.com/314587419725/reporting";
  const sqs = new AWS.SQS({ region: "us-east-1" });

  // help from https://medium.com/@drwtech/a-node-js-introduction-to-amazon-simple-queue-service-sqs-9c0edf866eca
  const params = {
    QueueUrl: SQS_ENDPOINT,
    MaxNumberOfMessages: 1,
    VisibilityTimeout: 0,
    WaitTimeSeconds: 0
  };

  sqs.receiveMessage(params, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      if (!data.Message) {
        console.log("No messages in queue");
        return;
      }

      const message = JSON.parse(data.Messages[0].Body);
      console.log(message);

      const deleteParams = {
        QueueUrl: SQS_ENDPOINT,
        ReceiptHandle: data.Messages[0].ReceiptHandle
      };

      sqs.deleteMessage(deleteParams, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Deleted message from queue");
        }
      });
    }
  });
};

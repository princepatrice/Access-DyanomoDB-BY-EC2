require("dotenv").config()
const os = require('os');

const express = require('express');
const AWS = require('aws-sdk');
const app = express();
const port = 3000;
YOUR_AWS_REGION = "us-east-1"

// Configure AWS SDK with your AWS credentials and region
AWS.config.update({ region: YOUR_AWS_REGION });

// Create an instance of the DynamoDB service
const dynamodb = new AWS.DynamoDB();

// Define the name of the DynamoDB table
const tableName = 'Counter';

app.get('/', (req, res) => {
  const serverIp = os.hostname();
  // Increment the counter value in DynamoDB
  incrementCounter(serverIp)
    .then(() => {
      res.send(`Koya Patrice Dzogbema. (${serverIp}) Counter value updated successfully!`);
    })
    .catch((error) => {
      console.error('Error updating counter:', error);
      res.status(500).send('An error occurred while updating the counter.');
    });
});

// Function to increment the counter in DynamoDB
function incrementCounter(serverIp) {
  const params = {
    TableName: tableName,
    Key: { serverIp: { S: serverIp } },
    UpdateExpression: 'ADD #val :incr',
    ExpressionAttributeNames: { '#val': 'value' },
    ExpressionAttributeValues: { ':incr': { N: '1' } },
    ReturnValues: 'UPDATED_NEW',
  };

  return new Promise((resolve, reject) => {
    dynamodb.updateItem(params, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});








'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = () => dynamoDb.scan({ TableName: 'animals' }).promise()
    .then(r => r.Items);
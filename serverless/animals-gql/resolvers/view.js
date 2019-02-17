'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (id) => {
    const params = {
        TableName: 'animals',
        Key: { id }
    };
    return dynamoDb.get(params).promise()
        .then(r => r.Item);
};
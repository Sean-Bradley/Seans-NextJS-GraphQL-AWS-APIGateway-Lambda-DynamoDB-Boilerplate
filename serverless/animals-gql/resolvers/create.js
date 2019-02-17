'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports = (data) => {
    const params = {
        TableName: 'animals',
        Item: {
            id: uuid.v1(),
            genus: data.genus,
            isHungry: data.isHungry,            
            name: data.name, 
            lastFedDate: 0,           
            dateAdded: Date.now(),
        }
    };
    return dynamoDb.put(params).promise()
        .then(result => params.Item);
};
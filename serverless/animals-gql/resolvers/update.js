const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (data) => {
    const params = {
        TableName: 'animals',
        Key: {
            'id': data.id
        },
        UpdateExpression: 'set #n = :n',
        ExpressionAttributeValues: {
            ':n': data.name
        },
        ExpressionAttributeNames: {
            '#n': 'name'
        }
    };
    return dynamoDb.update(params).promise()
        .then(result => params.Item);
};
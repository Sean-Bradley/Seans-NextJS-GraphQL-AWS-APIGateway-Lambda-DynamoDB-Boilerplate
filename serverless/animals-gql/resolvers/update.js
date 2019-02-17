const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (data) => {
    const params = {
        TableName: 'animals',
        Key: {
            'id': data.id
        },
        UpdateExpression: 'set #n = :n, #lfd = :lfd',
        ExpressionAttributeValues: {
            ':n': data.name,
            ':lfd': data.lastFedDate
        },
        ExpressionAttributeNames: {
            '#n': 'name',
            '#lfd': 'lastFedDate'
        }
    };
    return dynamoDb.update(params).promise()
        .then(result => params.Item);
};
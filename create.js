let AWS = require('aws-sdk')
let uuidv4 = require('uuid/v4')
let tableName = 'REPLACE'
let accessKeyId = 'REPLACE'
let secretAccessKey= 'REPLACE'

AWS.config.update({
  region: 'ap-southeast-1',
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey}
})

let docClient = new AWS.DynamoDB.DocumentClient()

// create new data object
let obj = {
    id: uuidv4(),
    timestamp: (new Date()).toLocaleString(),
    // add more properties
}

let params = {
    TableName: tableName,
    Item: obj
}

docClient.put(params, (err, data) => {
    if (err)
        return console.error("Unable to create data. Error JSON:", JSON.stringify(err, null, 2));

    console.log("Create succeeded:", obj)
    console.log("DynamoDB response:", JSON.stringify(data, null, 2))
})
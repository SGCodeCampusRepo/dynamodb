let AWS = require('aws-sdk');
let tableName = 'REPLACE'
let accessKeyId = 'REPLACE'
let secretAccessKey= 'REPLACE'
// id key of the item you want to update
let keyToUpdate = 'REPLACE'

AWS.config.update({
  region: 'ap-southeast-1',
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey}
})

let docClient = new AWS.DynamoDB.DocumentClient()

// assign the update object from event here
let obj = {
    id: keyToUpdate,
    timestamp: (new Date()).toLocaleString()
}

let params = {
    TableName: tableName,
    Item: obj
}

// replace .put() with .update()
docClient.put(params, (err, data) => {
    if (err)
        return console.error("Unable to update data. Error JSON:", JSON.stringify(err, null, 2));

    console.log("Update succeeded for id:", keyToUpdate)
    console.log("DynamoDB response:", JSON.stringify(data, null, 2))

})
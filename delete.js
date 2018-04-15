let AWS = require('aws-sdk')
let tableName = 'REPLACE'
let accessKeyId = 'REPLACE'
let secretAccessKey= 'REPLACE'
// id key of the item you want to delete
let keyToDelete =  'REPLACE'

AWS.config.update({
  region: 'ap-southeast-1',
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey}
})

let docClient = new AWS.DynamoDB.DocumentClient()

let params = {
    TableName: tableName,
    Key: {
    	id: keyToDelete
    }
}

docClient.delete(params, (err, data) => {
    if (err)
        return console.error("Unable to delete. Error JSON:", JSON.stringify(err, null, 2));

    console.log("Delete succeeded for id:", keyToDelete)
	console.log("DynamoDB response:", JSON.stringify(data, null, 2))
})
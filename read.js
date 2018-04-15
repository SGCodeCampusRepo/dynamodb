let AWS = require("aws-sdk");
let tableName = 'REPLACE'
let accessKeyId = 'REPLACE'
let secretAccessKey= 'REPLACE'

AWS.config.update({
  region: 'ap-southeast-1',
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey}
})

let docClient = new AWS.DynamoDB.DocumentClient()

let params = {
    TableName: tableName,
    // ProjectionExpression: "#n, is_vegetarian, cook_time",
    // ExpressionAttributeNames: {
    //     "#n": "name",
    // },
    // ExpressionAttributeValues: {
    //      ":burger": "burger" 
    // },
    // FilterExpression: "#n = :burger",
}

let results = [];

docClient.scan(params, onScan);

function onScan(err, data) {
    if (err)
        return console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    
    // update the result array
    results = results.concat(data.Items)
    console.log("Count: ", data.Count)
    console.log("Scanned: ", data.ScannedCount)
    
    // if the scan is complete, the 'LastEvaluatedKey' 
    // property of the 'data' obj will be undefined
    if (!data.LastEvaluatedKey) {
        console.log('Scan complete: ', results.length, " items retrieved.")
    }

    // continue scanning because scan can retrieve a maximum of 1MB of data
    if (typeof data.LastEvaluatedKey != "undefined") {
        console.log("Scanning for more...");
        params.ExclusiveStartKey = data.LastEvaluatedKey;
        docClient.scan(params, onScan);
    }
}
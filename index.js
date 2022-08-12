
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-east-1'});
  
exports.handler = async (event) => {

  var eventbridge = new AWS.EventBridge({apiVersion: '2015-10-07'});


  var tempparams = {
    Limit: '5',
  };

  var response =  await eventbridge.listRules(tempparams).promise();
  
  console.log(response);

  var params = {
    Name: 'test-schedule-1', /* required */
    Description: 'test event scheduling',
    ScheduleExpression: 'rate(3 minutes)',
    State: "ENABLED",
    Tags: [
      {
        Key: 'CreatedBy', /* required */
        Value: 'Saravana' /* required */
      },
    ]
  };

  console.log(params);

  var response1 = await eventbridge.putRule(params).promise();

  console.log(response1);

  if (response1.RuleArn) {
    var targetParams = {
      Rule: "test-schedule-1",
      Targets: [{
        Arn: "<lambda-arn>",
        Id: "5678_1234",
        Input: '{"NAME":"SARAVANA", "ID": "1234"}',
      }]
    }
    var response2 = await eventbridge.putTargets(targetParams).promise();

    console.log(response2);
  }
};

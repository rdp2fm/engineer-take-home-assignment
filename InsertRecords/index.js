'use strict'

const csv = require('csv-parser');
const streamifier = require('streamifier');
var mysql  = require('mysql');
var aws = require('aws-sdk');
var ses = new aws.SES({region: 'us-west-2'});
exports.handler = function(event, context, callback) {
	let request = JSON.parse(event.body);
	var recordsInserted = 0;
	var anonymousRecords = 0;
	var valueInserted = 0.0;


  	var connection = mysql.createConnection({
    host     : process.env.databaseHost,
    user     : process.env.databaseUser,
    password : process.env.databasePassword,
    database : process.env.database
  	});


  	var params = {
        Destination: {
            ToAddresses: ["robertp93@gmail.com"]
        },
        Message: {
            Body: {
                Html: { Data: "Lincoln Donation Status"
                    
                }
                
            },
            
            Subject: { Data: "Test Email"
                
            }
        },
        Source: "robertp93@gmail.com"
    };

	let base64String = request.base64String;
	let buffer = new Buffer.from(base64String, 'base64');
	var res = [];
	streamifier.createReadStream(buffer).pipe(csv())
	.on('data', (row) => {
		var tmp = [];
		tmp.push(row.donor_id);
		tmp.push(row.donor_name || "Anonymous");
		tmp.push(row.donor_email || "Anonymous");
		tmp.push(row.donor_gender || "Anonymous");
		tmp.push(row.donor_address || "Anonymous");
		tmp.push(row.donation_amount);
		res.push(tmp);
		recordsInserted = recordsInserted+1;
		valueInserted = valueInserted + parseFloat(row.donation_amount);
		if(!row.donor_name){
			anonymousRecords = anonymousRecords+1;
		}

	})
	.on('end', () => {
		var sql = "INSERT INTO donations(donor_id, donor_name, donor_email, donor_gender, donor_address, donation_amount) VALUES ?";
  		connection.query(sql, [res]);
		connection.end();



		params.Message.Body.Html.Data = "<h3>Hello Lincoln User,</h3><h3>The following donations recently processed:</h3><h4>New donations: "+recordsInserted+" donations for a total of $"+valueInserted+"</h4><h4>Percentage of new anonymous donors: "+(100* anonymousRecords/(1.0 * recordsInserted))+"%</h4>";
		
		var lambdaRes = {
	        "statusCode": 200,
	        "headers": {
            	"Access-Control-Allow-Origin": "*"
        	},
	        "body": JSON.stringify({"status" : "OK"}),
	        "isBase64Encoded": false
    	};
    	ses.sendEmail(params, function (err, data) {
        callback(null, {err: err, data: data});
        if (err) {
            console.log(err);
            context.fail(err);
        } else {
            
            console.log(data);
            context.succeed(event);
        }
    });
		callback(null, lambdaRes)
	})
	
}

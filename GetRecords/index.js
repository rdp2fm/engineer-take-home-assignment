'use strict'

var mysql  = require('mysql');

exports.handler = function(event, context, callback) {

	var connection = mysql.createConnection({
    host     : process.env.databaseHost,
    user     : process.env.databaseUser,
    password : process.env.databasePassword,
    database : process.env.database
  	});


		var sql = "SELECT * FROM donations";
  		connection.query(sql, function (error, results, fields){
  			var lambdaRes = {
	        "statusCode": 200,
	         "headers": {
            	"Access-Control-Allow-Origin": "*"
        	},
	        "body": JSON.stringify(results),
	        "isBase64Encoded": false
    	};
		callback(null, lambdaRes)
  		});
		connection.end();
		
	
}

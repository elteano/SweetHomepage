// Querystring allows us to parse the message body into a JS object.
var querystring = require('querystring');
var ideas = require('../idea.json');

function parse_data(data)
{
	data_chunk = data.split('&');
	console.log(data_chunk);
}

exports.add = function (req, res)
{
	console.log('adding object');
	// This stores the raw string data sent by the client
	var body = "";
	// Callback function for when data is received.
	req.on('data', function(chunk)
	{
		// Aggregate the data sent by the client
		body += chunk.toString();
	});
	// Callback function for when the client declares no more data will be sent
	req.on('end', function()
	{
		// Parse the client data into a JS object
		console.log(body);
		var input = querystring.parse(body);
		parse_data(body);
		console.log(input);
	});
}


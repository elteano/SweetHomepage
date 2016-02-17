var ideas = require('../idea.json');

function parse_data(data)
{
	var obj = {};
	data = data.replace(/\+/g, ' ');
	data = data.replace(/%5B%5D/g, '');
	data_chunk = data.split('&');
	for (var i = 0; i < data_chunk.length; i++)
	{
		data_part = data_chunk[i].split('=');
		var leftb = data_part[0].indexOf('%5B');
		if (leftb != -1)
		{
			var rightb = data_part[0].indexOf('%5D');
			var bigvar = data_part[0].substring(0, leftb);
			var subvar = data_part[0].substring(leftb+3, rightb);
			if (!(bigvar in obj))
			{
				obj[bigvar] = {};
			}
			if (subvar in obj[bigvar])
			{
				if (obj[bigvar][subvar].constructor === Array)
				{
					obj[bigvar][subvar].push(data_part[1]);
				}
				else
				{
					obj[bigvar][subvar] = [obj[bigvar][subvar], data_part[1]];
				}
			}
			else
			{
				obj[bigvar][subvar] = data_part[1];
			}
		}
		else if (data_part[0] in obj)
		{
			if (obj[data_part[0]].constructor === Array)
			{
				obj[data_part[0]].push(data_part[1]);
			}
			else
			{
				obj[data_part[0]] = [obj[data_part[0]], data_part[1]];
			}
		}
		else
		{
			obj[data_part[0]] = data_part[1];
		}
	}
	return obj;
}

exports.add = function (req, res)
{
	console.log('adding object not yet implemented');
	// Placeholder
}

exports.edit = function (req, res)
{
	var input = {};
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
		input = parse_data(body);
		console.log(input);
		var index = input.index;
		delete input.index; // don't want these lingering around
		ideas.ideas[index] = input;
	});
}


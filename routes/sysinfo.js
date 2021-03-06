var ideas = require('../idea.json');

exports.get_one = function (req, res)
{
	var ret_json = [ideas.ideas[req.query.id]];
	if (req.query.moons)
	{
		var centerplan = ideas.ideas[req.query.id];
		console.log('get_one centerplan');
		console.log(centerplan);
		if (centerplan.moons)
		{
			for (var i = 0; i < centerplan.moons.length; i++)
			{
				ret_json.push(ideas.ideas[centerplan.moons[i]]);
			}
		}
	}
	res.json(ret_json);
}

exports.get_info = function (req, res)
{
	if (req.query && req.query.query)
	{
		res.json(search(req.query.query, ideas));
	}
	else
	{
		res.json(get_heads(ideas));
	}
}

function search(str, planet_chunk)
{
	var ret_arr = [];
	str = str.toLowerCase();
	for (var i = 0; i < planet_chunk.ideas.length; i++)
	{
		if (planet_chunk.ideas[i].name.toLowerCase().indexOf(str) != -1)
		{
			ret_arr.push({"planet": planet_chunk.ideas[i], "ind": i});
		}
	}
	return ret_arr;
}

function get_heads(all_data)
{
	var ret_arr = [];
	for (var i = 0; i < all_data.ideas.length; i++)
	{
		if (all_data.ideas[i].parent == "-1")
		{
			ret_arr.push({"planet": all_data.ideas[i], "ind": i});
		}
	}
	return ret_arr;
}


var idea = require('../idea.json');

exports.view = function(req, res)
{
	idea.helpers = {
		"sysclip": function(str) {
				if (str.length > 25)
				{
					return str.substring(0, 25) + '...';
				}
				return str;
		},
		"dumblook": function(ind1, ind2)
		{
			return idea.ideas[idea.ideas[ind1].moons[ind2]].name;
		},
		"dumbcolor": function(ind1, ind2)
		{
			return idea.ideas[idea.ideas[ind1].moons[ind2]].color;
		}
	};
	if (req.query.sys)
	{
		idea.viewme = req.query.sys;
	}
	else
	{
		idea.viewme = 0;
	}
	
	var arr=[{'id': idea.viewme, 'name': idea.ideas[idea.viewme].name}];
	var parent = undefined;
	if (idea.ideas[idea.viewme] != undefined)
	 	parent = idea.ideas[idea.viewme].parent;
	if (!arr[0].name)
	{
		arr[0].name = 'Unnamed, name me!';
	}
	while (parent != undefined && parent != -1)
	{
		
		var pob = {
			'id': parent,
			'name': idea.ideas[parent].name
		};
		if (!pob.name)
		{
			pob.name = 'Unnamed, name me!';
		}
		arr.unshift(pob);
		parent = idea.ideas[parent].parent;
	
	}
	idea.parents = arr;
	res.render('pages/system', idea);
}

exports.viewOld = function (req, res)
{
	if (req.query.sys)
	{
		idea.viewme = req.query.sys;
	}
	else
	{
		idea.viewme = 0;
	}
	idea.helpers = {
		"sysclip": function(str) {
				if (str.length > 25)
				{
					return str.substring(0, 25) + '...';
				}
				return str;
		},
		"dumblook": function(ind1, ind2)
		{
			return idea.ideas[idea.ideas[ind1].moons[ind2]].name;
		},
		"dumbcolor": function(ind1, ind2)
		{
			return idea.ideas[idea.ideas[ind1].moons[ind2]].color;
		}
	};

	idea.parents = [];

	res.render('pages/system', idea);
}

exports.addSystem = function(req, res) {
idea["ideas"].push({
			"parent": "-1",
			"name": '',
			"color": '88ff00',
			"body": '',
			"moons": []

});
res.render('pages/system?sys=' + (idea.ideas.length-1),idea);
}

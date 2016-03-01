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
	idea.viewme = req.params.id;
	
	var arr=[req.params.id];
	var parent = undefined;
	if (idea.ideas[req.params.id] != undefined)
	 	parent = idea.ideas[req.params.id].parent;
	while (parent != undefined && parent != -1)
	{
		
		arr.unshift(parent);
		parent = idea.ideas[parent].parent;
	
	}
	idea.parents = arr;
	res.render('pages/system', idea);
}

exports.viewOld = function (req, res)
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
	idea.viewme = req.params.id;

	res.render('pages/system', idea);
}

exports.addSystem = function(req, res) {
idea["ideas"].push({
			"parent": "-1",
			"name": 'New Idea',
			"color": '888888',
			"body": 'Fill me in',
			"moons": []

});
res.render('pages/system/' + (idea.ideas.length-1),idea);
}

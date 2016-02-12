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
	res.render('pages/system', idea);
}


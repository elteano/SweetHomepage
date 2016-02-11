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
		}
	};
	res.render('pages/system', idea);
}


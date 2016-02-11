var idea = require('../idea.json');

exports.view = function(req, res)
{
	res.render('pages/system', idea);
}


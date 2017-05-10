var elementsService = require('../services/elements-service');

function list (req, res, next) {
	return res.render('users-template-list', {
		user: req.user
	});
}

function details (req, res, next) {
	try {
		var element = elementsService.getByIdUserFiltered(parseInt(req.query.id), req.user);
		console.log('element', element)
		return res.render('users-template-details', {
			user: req.user,
			element: element
		});
	}
	catch (exception) {
		return res.render('users-template-unauthorized', {
			user: req.user
		});
	}
}

module.exports = {
	list,
	details
};

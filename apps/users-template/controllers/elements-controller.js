var elementsService = require('../services/elements-service');
var authorization = require('../../../utils/authorization');

function list (req, res, next) {
	return res.render('users-template-list', {
		user: req.user
	});
}

function details (req, res, next) {
	var view = authorization.hasPermission(req.user, 'view-details') ?
		'users-template-details' : 'users-template-unauthorized';
	var element = elementsService.getById(parseInt(req.query.id));

	return res.render(view, {
		user: req.user,
		element: element
	});
}

module.exports = {
	list,
	details
};

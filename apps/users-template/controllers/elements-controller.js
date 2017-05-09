var elementsService = require('../services/elements-service');
var authorization = require('../../../utils/authorization'); // TODO Use

function list (req, res, next) {
	return res.render('users-template-list', {
		user: req.user
	});
}

function details (req, res, next) {
	var view = authorization.hasPermission(req.user, 'view-restricted') ? 'users-template-details' : 'users-template-unauthorized';
	var element = elementsService.getByIdUserFiltered(parseInt(req.query.id), req.user && req.user.id);

	return res.render(view, {
		user: req.user,
		element: element
	});
}

module.exports = {
	list,
	details
};

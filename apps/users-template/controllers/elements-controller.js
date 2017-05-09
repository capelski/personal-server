var authorization = require('../../../utils/authorization');

function index (req, res, next) {
	return res.render('users-template-index', {
		user: req.user
	});
}

function secured (req, res, next) {
	var view = authorization.isAuthenticated(req.user) ?
		'users-template-secured' : 'users-template-unauthorized';

	return res.render(view, {
		user: req.user
	});
}

function restricted (req, res, next) {
	var view = authorization.hasPermission(req.user, 'view-restricted') ?
		'users-template-restricted' : 'users-template-unauthorized';

	return res.render(view, {
		user: req.user
	});
}

module.exports = {
	index,
	secured,
	restricted
};

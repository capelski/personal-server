
function index (req, res, next) {
	return res.render('users-template-index', {
		user: req.user
	});
}

function secured (req, res, next) {
	var view = req.user ?
		'users-template-secured' : 'users-template-unauthorized';

	return res.render(view, {
		user: req.user
	});
}

function restricted (req, res, next) {
	var view = req.user && req.user.permissions.indexOf('view-restricted') > -1 ?
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

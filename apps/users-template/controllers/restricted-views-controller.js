function list (req, res, next) {
	return res.render('users-template-restricted-list', {
		user: req.user
	});
}

function details (req, res, next) {
	return res.render('users-template-restricted-details', {
		user: req.user,
		restrictedId: parseInt(req.query.id)
	});
}

module.exports = {
	list,
	details
};

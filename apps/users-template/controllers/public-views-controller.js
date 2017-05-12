function list (req, res, next) {
	return res.render('users-template-public-list', {
		user: req.user
	});
}

function details (req, res, next) {
	return res.render('users-template-public-details', {
		user: req.user,
		publicId: parseInt(req.query.id)
	});
}

module.exports = {
	list,
	details
};

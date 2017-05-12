function list (req, res, next) {
	return res.render('users-template-public-list');
}

function details (req, res, next) {
	return res.render('users-template-public-details', {
		publicId: parseInt(req.query.id)
	});
}

module.exports = {
	list,
	details
};

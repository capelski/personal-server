function create (req, res, next) {
	return res.render('users-template-public-edit', {
		publicId: null
	});
}

function details (req, res, next) {
	return res.render('users-template-public-details', {
		publicId: parseInt(req.query.id)
	});
}

function edit (req, res, next) {
	return res.render('users-template-public-edit', {
		publicId: parseInt(req.query.id)
	});
}

function list (req, res, next) {
	return res.render('users-template-public-list');
}

module.exports = {
	create,
	details,
	edit,
	list
};

function create (req, res, next) {
	return res.render('public-edit', {
		publicId: null
	});
}

function details (req, res, next) {
	return res.render('public-details', {
		publicId: parseInt(req.query.id)
	});
}

function edit (req, res, next) {
	return res.render('public-edit', {
		publicId: parseInt(req.query.id)
	});
}

function list (req, res, next) {
	return res.render('public-list');
}

module.exports = {
	create,
	details,
	edit,
	list
};

function create (req, res, next) {
	return res.render('restricted-edit', {
		restrictedId: null
	});
}

function details (req, res, next) {
	return res.render('restricted-details', {
		restrictedId: parseInt(req.query.id)
	});
}

function edit (req, res, next) {
	return res.render('restricted-edit', {
		restrictedId: parseInt(req.query.id)
	});
}

function list (req, res, next) {
	return res.render('restricted-list');
}

module.exports = {
	create,
	details,
	edit,
	list
};

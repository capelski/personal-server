function create (req, res, next) {
	return res.render('users-template-restricted-edit', {
		restrictedId: null
	});
}

function details (req, res, next) {
	return res.render('users-template-restricted-details', {
		restrictedId: parseInt(req.query.id)
	});
}

function edit (req, res, next) {
	return res.render('users-template-restricted-edit', {
		restrictedId: parseInt(req.query.id)
	});
}

function list (req, res, next) {
	return res.render('users-template-restricted-list');
}

module.exports = {
	create,
	details,
	edit,
	list
};

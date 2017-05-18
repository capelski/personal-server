var restrictedService = require('../../services/restricted-service');

function deleteRestricted (req, res, next) {
	var restricted = restrictedService.delete(parseInt(req.body.id));
	return res.json(restricted);
}

function getAll (req, res, next) {
	var restricteds = restrictedService.getAll();
	return res.json(restricteds);
}

function getById (req, res, next) {
	var restricted = restrictedService.getById(parseInt(req.query.id));
	return res.json(restricted);
}

function update (req, res, next) {
	var updatedRestricted = req.body;
	var restricted = restrictedService.update(updatedRestricted);
	return res.json(restricted);
}

module.exports = {
	delete: deleteRestricted,
	getAll,
	getById,
	update
};

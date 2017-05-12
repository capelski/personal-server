var restrictedService = require('../services/restricted-service');

function getAll (req, res, next) {
	var restricteds = restrictedService.getAll();
	return res.json(restricteds);
}

function getById (req, res, next) {
	var restricted = restrictedService.getById(parseInt(req.query.id));
	return res.json(restricted);
}

module.exports = {
	getAll,
	getById
};

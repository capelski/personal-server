var publicService = require('../services/public-service');

function getAll (req, res, next) {
	var publics = publicService.getAll();
	return res.json(publics);
}

function getById (req, res, next) {
	var public = publicService.getById(parseInt(req.query.id));
	return res.json(public);
}

module.exports = {
	getAll,
	getById
};

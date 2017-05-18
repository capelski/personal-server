var publicService = require('../../services/public-service');

function create (req, res, next) {
	var public = publicService.create(req.body);
	return res.json(public);
}

function deletePublic (req, res, next) {
	var public = publicService.delete(parseInt(req.body.id));
	return res.json(public);
}

function getAll (req, res, next) {
	var publics = publicService.getAll();
	return res.json(publics);
}

function getById (req, res, next) {
	var public = publicService.getById(parseInt(req.query.id));
	return res.json(public);
}

function update (req, res, next) {
	var updatedPublic = req.body;
	var public = publicService.update(updatedPublic);
	return res.json(public);
}

module.exports = {
	create,
	delete: deletePublic,
	getAll,
	getById,
	update
};

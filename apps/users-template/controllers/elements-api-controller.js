var elementsService = require('../services/elements-service');
var authorization = require('../../../utils/authorization'); // TODO Use

function getAll (req, res, next) {
	var selectedElements = elementsService.getAll(req.user && req.user.id);
	return res.json(selectedElements);
}

function getById (req, res, next) {
	var element = elementsService.getById(parseInt(req.query.id));
	return res.json(element);
}

module.exports = {
	getAll,
	getById
};

var elementsService = require('../services/elements-service');
var authorization = require('../../../utils/authorization'); // TODO Use

function getAll (req, res, next) {
	var selectedElements = elementsService.getAllUserFiltered(req.user && req.user.id);
	return res.json(selectedElements);
}

function getById (req, res, next) {
	var element = elementsService.getByIdUserFiltered(parseInt(req.query.id), req.user && req.user.id);
	return res.json(element);
}

module.exports = {
	getAll,
	getById
};

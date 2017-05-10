var elementsService = require('../services/elements-service');
var elementsSecurity = require('./elements-security');

function getAll (req, res, next) {
	var selectedElements = elementsService.getAllUserFiltered(req.user);
	return res.json(selectedElements);
}

function getById (req, res, next) {
	var element = elementsService.getById(parseInt(req.query.id));
	return elementsSecurity.elementAccess(req, res, 'api', element)
	.then(function () {
		return res.json(element);
	});
}

module.exports = {
	getAll,
	getById
};

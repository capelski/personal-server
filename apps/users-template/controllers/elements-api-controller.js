var elementsService = require('../services/elements-service');
var elementsSecurity = require('./elements-security');

function getAll (req, res, next) {
	var selectedElements = elementsService.getAllUserFiltered(req.user);
	return res.json(selectedElements);
}

function getByIdPromise (req, res, next) {
	var element = elementsService.getById(parseInt(req.query.id));
	return elementsSecurity.allowedElementPromise(req, res, 'api', element)
	.then(function () {
		return res.json(element);
	});
}

function getByIdMiddleware (req, res, next) {
	return res.json(req.element);
}

module.exports = {
	getAll,
	getById: getByIdMiddleware
};

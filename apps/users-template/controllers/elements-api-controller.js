var elementsService = require('../services/elements-service');

function getAll (req, res, next) {
	var selectedElements = elementsService.getAllUserFiltered(req.user);
	return res.json(selectedElements);
}

function getById (req, res, next) {
	try {
		var element = elementsService.getByIdUserFiltered(parseInt(req.query.id), req.user);
		return res.json(element);
	}
	catch (exception) {
		return res.json(exception);
	}
}

module.exports = {
	getAll,
	getById
};

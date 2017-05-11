var elementsService = require('../services/elements-service');
var elementsSecurity = require('./elements-security');

function list (req, res, next) {
	return res.render('users-template-list', {
		user: req.user
	});
}

function detailsPromise (req, res, next) {
	var element = elementsService.getById(parseInt(req.query.id));
	return elementsSecurity.allowedElementPromise(req, res, 'view', element)
	.then(function () {
		return res.render('users-template-details', {
			user: req.user,
			element: element
		});
	});
}

function detailsMiddleware (req, res, next) {
	return res.render('users-template-details', {
		user: req.user,
		element: req.element
	});
}

module.exports = {
	list,
	details: detailsMiddleware
};

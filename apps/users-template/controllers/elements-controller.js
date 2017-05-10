var elementsService = require('../services/elements-service');
var elementsSecurity = require('./elements-security');

function list (req, res, next) {
	return res.render('users-template-list', {
		user: req.user
	});
}

function details (req, res, next) {
	var element = elementsService.getById(parseInt(req.query.id));
	return elementsSecurity.filterElementAccess(element, req, res, 'view')
	.then(function () {
		return res.render('users-template-details', {
			user: req.user,
			element: element
		});
	});
}

module.exports = {
	list,
	details
};

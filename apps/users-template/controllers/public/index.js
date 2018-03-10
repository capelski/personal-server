var security = require('../../../../utils/security');
var apiController = require('./public-api-controller');
var viewsController = require('./public-views-controller');
	
module.exports = function(router, middleware) {
	router.get('/public', middleware.passport, viewsController.list);
	router.get('/public/details', middleware.passport, viewsController.details);
	router.get('/public/edit', middleware.passport, viewsController.edit);
	router.get('/public/create', middleware.passport, viewsController.create);
	
	router.get('/api/public', middleware.passport, [security.securizeApi('public:view'), apiController.getAll]);
	router.post('/api/public', middleware.passport, [security.securizeApi('public:create'), apiController.create]);
	router.put('/api/public', middleware.passport, [security.securizeApi('public:edit'), apiController.update]);
	router.delete('/api/public', middleware.passport, [security.securizeApi('public:delete'), apiController.delete]);
	router.get('/api/public/getById', middleware.passport, [security.securizeApi('public:view'), apiController.getById]);
};

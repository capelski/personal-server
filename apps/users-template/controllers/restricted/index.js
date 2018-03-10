var security = require('../../../../utils/security');
var apiController = require('./restricted-api-controller');
var viewsController = require('./restricted-views-controller');

module.exports = function(router, middleware) {
	router.get('/restricted', middleware.passport, viewsController.list);
	router.get('/restricted/details', middleware.passport, viewsController.details);
	router.get('/restricted/edit', middleware.passport, viewsController.edit);
	router.get('/restricted/create', middleware.passport, viewsController.create);
	
	router.get('/api/restricted', middleware.passport, [security.securizeApi('restricted:view'), apiController.getAll]);
	router.post('/api/restricted', middleware.passport, [security.securizeApi('restricted:create'), apiController.create]);
	router.put('/api/restricted', middleware.passport, [security.securizeApi('restricted:edit'), apiController.update]);
	router.delete('/api/restricted', middleware.passport, [security.securizeApi('restricted:delete'), apiController.delete]);
	router.get('/api/restricted/getById', middleware.passport, [security.securizeApi('restricted:view'), apiController.getById]);
};

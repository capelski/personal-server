var security = require('../../../../utils/security');
var apiController = require('./restricted-api-controller');
var viewsController = require('./restricted-views-controller');

module.exports = function(router) {
	router.get('/restricted', viewsController.list);
	router.get('/restricted/details', viewsController.details);
	router.get('/restricted/edit', viewsController.edit);
	router.get('/restricted/create', viewsController.create);
	
	router.get('/api/restricted', [security.securizeApi('restricted:view'), apiController.getAll]);
	router.post('/api/restricted', [security.securizeApi('restricted:create'), apiController.create]);
	router.put('/api/restricted', [security.securizeApi('restricted:edit'), apiController.update]);
	router.delete('/api/restricted', [security.securizeApi('restricted:delete'), apiController.delete]);
	router.get('/api/restricted/getById', [security.securizeApi('restricted:view'), apiController.getById]);
};

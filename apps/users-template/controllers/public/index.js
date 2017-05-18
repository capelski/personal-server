var security = require('../../../../utils/security');
var apiController = require('./public-api-controller');
var viewsController = require('./public-views-controller');
	
module.exports = function(router) {
	router.get('/public', viewsController.list);
	router.get('/public/details', viewsController.details);
	router.get('/public/edit', viewsController.edit);
	router.get('/public/create', viewsController.create);
	
	router.get('/api/public', [security.securizeApi('public:view'), apiController.getAll]);
	router.post('/api/public', [security.securizeApi('public:create'), apiController.create]);
	router.put('/api/public', [security.securizeApi('public:edit'), apiController.update]);
	router.delete('/api/public', [security.securizeApi('public:delete'), apiController.delete]);
	router.get('/api/public/getById', [security.securizeApi('public:view'), apiController.getById]);
};

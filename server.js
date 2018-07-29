const { join } = require('path');
const { runServer, express } = require('modena');
const config = require('./config');

config.PORT = 80;

config.beforeRegisteringApps = (server, tracer, modenaConfig, appsConfig) => {
	const pluginsPath = join(__dirname, 'plugins');
	server.use('/plugins', express.static(pluginsPath));
};

config.afterRegisteringApps = (server, tracer, modenaConfig, appsConfig) => {
	server.use((req, res, next) => {
		tracer.info('Url ' + req.url + ' was not found');
	
		return res.status(404)._render('error-page', {
			title: 'Not found',
			statusCode: 404,
			message: 'The url you are looking for does not exist'
		});
	});
	
	server.use((err, req, res, next) => {
		tracer.error('Unhandled exception was raised');
		tracer.error(err);
	
		return res.status(500)._render('error-page', {
			title: 'Error',
			statusCode: 500,
			message: 'There is some error in the code :/'
		});
	});
};

console.log('Starting server with the following configuration:');
console.log(config);

runServer(config);

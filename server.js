const { join } = require('path');
const { runServer, express, readConfigFile } = require('modena');
const config = readConfigFile(join(__dirname, 'config.json'));

config.beforeRegisteringApps = server => {
	const staticFolder = join(__dirname, 'static');
	server.use(express.static(staticFolder, { dotfiles: 'allow' }));
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

runServer(config);

const { join } = require('path');
const { runServer } = require('modena');
const config = require('./config/config');

config.PORT = 80;

config.beforeRegisterApps = (server, modenaConfig, appsConfig, express) => {
	const pluginsPath = join(__dirname, 'plugins');
	server.use('/plugins', express.static(pluginsPath));
};

console.log('Starting server with the following configuration:');
console.log(config);

runServer(config);

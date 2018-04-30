const config = require('./config/config');

const { configureWinston } = require('./utils/winston-config');
configureWinston(config);

const tracer = require('./utils/tracer');
tracer.setTraceLevel(config.tracerLevel);

const express = require('express');
const server = express();
server.set('view engine', 'ejs');
const { join } = require('path');
var appsFolder = join(__dirname, 'apps');
server.set('views', appsFolder);

const { configurePassport } = require('./utils/passport');
tracer.trace(configurePassport)(server);

const { discoverApps } = require('./utils/app-discovery');
const appsConfig = tracer.trace(discoverApps)(config);

const { getAppResolverMiddleware } = require('./utils/app-resolver');
server.use(tracer.trace(getAppResolverMiddleware(config, appsConfig)));

const { registerApps } = require('./utils/app-register');
tracer.trace(registerApps)(server, config, appsConfig);

tracer.trace('listen', server)(config.port, function (error) {
	if (error) {
		tracer.error(error);
	}
	else {
		tracer.info('Express server listening on port ' + config.port);
	}
});

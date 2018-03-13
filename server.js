const config = require('./config/config');

const { configureWinston } = require('./utils/winston-config');
configureWinston(config);

const tracer = require('./utils/tracer');
tracer.setTraceLevel(config.logs.tracerLevel);

const { discoverApps } = require('./utils/app-discovery')
const apps = discoverApps(config);

const express = require('express');
const server = express();
server.set('view engine', 'ejs');

const { configurePassport } = require('./utils/passport');
configurePassport(server);

const { publishApps } = require('./utils/app-publisher');
tracer.trace(publishApps)(server, config, apps);

tracer.trace('listen', server)(config.port, function (error) {
	if (error) {
		tracer.error(error);
	}
	else {
		tracer.info('Express server listening on port ' + config.port);
	}
});

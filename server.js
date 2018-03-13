const config = require('./config/config');

const { configureWinston } = require('./config/winston');
const winston = configureWinston(config);

const { configureTracer } = require('./config/tracer');
const { trace, setTraceLevel } = require('./utils/tracer');
setTraceLevel(config.logs.tracerLevel);

const { discoverApps } = require('./utils/app-discovery')
const apps = discoverApps(config);

const express = require('express');
const server = express();
server.set('view engine', 'ejs');

const { configurePassport } = require('./utils/passport');
configurePassport(server);

const { publishApps } = require('./utils/app-publisher');
trace(publishApps)(server, config, apps);

trace('listen', server)(config.port, function (error) {
	if (error) {
		winston.error(error);
	}
	else {
		winston.info('Express server listening on port', config.port);
	}
});

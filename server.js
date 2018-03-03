const config = require('./config/config');

const { configureWinston } = require('./config/winston');
const winston = configureWinston(config);

const { configureTracer } = require('./config/tracer');
const { trace } = configureTracer(config);

const { discoverApps } = require('./utils/app-discovery')
const apps = discoverApps(config);

const { configureExpress } = require('./config/express');
const server = configureExpress(config, apps);

const { configurePassport } = require('./utils/passport');
configurePassport(server, apps);

const { publishApps } = require('./utils/app-publisher');
trace(publishApps, 'publishApps')(server, apps);

trace(server.listen, 'server.listen', server)(config.port, function (error) {
	if (error) {
		winston.error(error);
	}
	else {
		winston.info('Express server listening on port', config.port);
	}
});

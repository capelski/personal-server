const config = require('./config/config');

const apps = discoverApps(config.defaultApp);
var winston = require('./config/winston');
var { trace } = require('./config/tracer');
var { discoverApps } = require('./utils/app-discovery')
var { publishApps } = require('./utils/app-publisher');


var server = require('./config/express')(config, apps);

trace(publishApps, 'publishApps')(server, apps);
trace(server.listen, 'server.listen', server)(config.port, function (error) {
	if (error) {
		winston.error(error);
	}
	else {
		winston.info('Express server listening on port', config.port);
	}
});

var config = require('./config/config');
var winston = require('./config/winston');
var tracer = require('./config/tracer');
var sassCompiler = require('./config/sass-compiler');
var appMapper = require('./config/app-mapper');
var server = require('./config/express');

tracer.trace(sassCompiler, 'sassCompiler')(config.hostedApps);
tracer.trace(appMapper.configure, 'appMapper.configure', appMapper)(server, config);
tracer.trace(server.listen, 'server.listen', server)(config.port, function (error) {
	if (error) {
		winston.error(error);
	}
	else {
		winston.info('Express server listening on port', config.port);
	}
});

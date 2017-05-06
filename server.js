var config = require('./config/config');
var winston = require('./config/winston');
var tracer = require('./config/tracer');
var sassCompiler = require('./config/sass-compiler');
var appMapper = require('./config/app-mapper');
var format = require('./utils/format');
var server = require('./config/express');

var formatter = value => format.digitPrepender(value, 0, 2);

tracer.trace(sassCompiler, 'sassCompiler')(config.hostedApps);
tracer.trace(appMapper, 'appMapper')(server, config.hostedApps);

tracer.trace(server.listen, 'server.listen', server)(config.port, function (error) {
	var currentDate = new Date();
	var formattedTime =  formatter(currentDate.getHours()) + ':' + formatter(currentDate.getMinutes()) + ':' +
	formatter(currentDate.getSeconds());

	if (error) winston.error(formattedTime, error);
	else winston.info(formattedTime, '-', 'Express server listening on port', config.port);
});

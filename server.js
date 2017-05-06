var config = require('./config/config');
var winston = require('./config/winston');
winston.info('Hiiiiiii')
var tracer = require('./utils/tracer')(config.logs.tracer.errorsOnly);
winston.info('Suprise!')
var server = require('./config/express');
var sassCompiler = require('./config/sass-compiler');
var appMapper = require('./config/app-mapper');
var format = require('./utils/format');

var formatter = value => format.digitPrepender(value, 0, 2);

tracer(sassCompiler, 'sassCompiler')(config.hostedApps);
tracer(appMapper, 'appMapper')(server, config.hostedApps);

tracer(server.listen, 'server.listen')(config.port, function (error) {
	var currentDate = new Date();
	var formattedTime =  formatter(currentDate.getHours()) + ':' + formatter(currentDate.getMinutes()) + ':' + formatter(currentDate.getSeconds());

	if (error) winston.error(formattedTime, error);
	else winston.info(formattedTime, '-', 'Express server listening on port', config.port);
});

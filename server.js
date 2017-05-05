var server = require('./config/express');
var config = require('./config/config');
var sassCompiler = require('./config/sass-compiler');
var appMapper = require('./config/app-mapper');
var format = require('./utils/format');
var winston = require('./config/winston');

var formatter = value => format.digitPrepender(value, 0, 2);

sassCompiler(config.hostedApps);
appMapper(server, config.hostedApps);


server.listen(config.port, function () {
	var currentDate = new Date();
	var formattedTime =  formatter(currentDate.getHours()) + ':' + formatter(currentDate.getMinutes()) + ':' + formatter(currentDate.getSeconds());
	winston.info(formattedTime, '-', 'Express server listening on port', config.port);
});

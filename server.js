var server = require('./config/express');
var config = require('./config/config');
var sassCompiler = require('./config/sass-compiler');
var appMapper = require('./config/app-mapper');

sassCompiler(config.hostedApps);
appMapper(server, config.hostedApps);

server.listen(config.port, function () {
	console.log('Express server listening on port ' + config.port);
});


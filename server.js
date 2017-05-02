var server = require('./config/express');
var config = require('./config/config');
var sassCompiler = require('./config/sass-compiler');
var appMapper = require('./config/app-mapper');

sassCompiler(config.hostedApps);
appMapper(server, config.hostedApps);

function zeroPrepender(value, digitsNumber) {
	var result = value.toString();
	while(result.length < digitsNumber) {
		result = '0' + result;
	}
	return result;
}

var formatter = value => zeroPrepender(value, 2);

server.listen(config.port, function () {
	var currentDate = new Date();
	var formattedTime =  formatter(currentDate.getHours()) + ':' + formatter(currentDate.getMinutes()) + ':' + formatter(currentDate.getSeconds());
	console.log(formattedTime, '-', 'Express server listening on port', config.port);
});

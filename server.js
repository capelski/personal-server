var server = require('./config/express');
var config = require('./config/config');
var appMapper = require('./config/app-mapper');

appMapper(server, config.hostedApps);

server.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});


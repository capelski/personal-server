var server = require('./config/express');
var config = require('./config/config');
var redirect = require('./config/redirect');

redirect(server, config.hostedApps);

server.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});


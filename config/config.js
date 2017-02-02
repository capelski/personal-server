var path = require('path');
var rootPath = path.normalize(__dirname + '/..');
var env = process.env.NODE_ENV || 'development';
var config = require('./config.json');

var selectedConfig = config[env];

selectedConfig.root = rootPath;
selectedConfig.port = process.env.PORT || selectedConfig.defaultPort;

module.exports = selectedConfig;

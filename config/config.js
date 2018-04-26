var path = require('path');
var fs = require('fs');
var env = process.env.NODE_ENV || 'development';

var config = require('./default-config.json');
if (fs.existsSync(path.join(__dirname, 'config.json'))) {
    config = require('./config.json');
}

var selectedConfig = config[env];

selectedConfig.root = path.join(__dirname, '..');
selectedConfig.port = process.env.PORT || selectedConfig.defaultPort;

module.exports = selectedConfig;

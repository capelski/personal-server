var { join } = require('path');
var { existsSync } = require('fs');
var env = process.env.NODE_ENV || 'development';

var configFile = require('./default-config.json');
if (existsSync(join(__dirname, 'config.json'))) {
    configFile = require('./config.json');
}

var selectedConfig = configFile[env];
var configProperties = Object.keys(selectedConfig);
var overridenPropeties = Object.keys(process.env).filter(p => configProperties.includes(p));
selectedConfig = overridenPropeties.reduce((config, p) => {
    config[p] = process.env[p];
    return config;
}, selectedConfig);

module.exports = selectedConfig;

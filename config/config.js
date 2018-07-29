var { join } = require('path');
var { existsSync } = require('fs');

var config = require('./default-config.json');

if (existsSync(join(__dirname, 'config.json'))) {
    config = require('./config.json');
}

var configProperties = Object.keys(config);
var overridenPropeties = Object.keys(process.env).filter(p => configProperties.includes(p));
config = overridenPropeties.reduce((config, p) => {
    config[p] = process.env[p];
    return config;
}, config);

module.exports = config;

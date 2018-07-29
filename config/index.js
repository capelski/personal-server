const { join } = require('path');
const { existsSync } = require('fs');

let config = {};
if (existsSync(join(__dirname, 'config.json'))) {
    config = require('./config.json');
}

module.exports = config;

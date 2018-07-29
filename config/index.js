const { join } = require('path');
const { existsSync } = require('fs');

// TODO Extract this check to modena too; allow providing a path (string) instead of options

let config = {};
if (existsSync(join(__dirname, 'config.json'))) {
    config = require('./config.json');
}

module.exports = config;

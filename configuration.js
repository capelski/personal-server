const dotenv = require('dotenv');
const { join } = require('path');

const defaultConfig = {
    APPS_PATH: join(__dirname, 'apps'),
    DEFAULT_APP: 'vue-personal-page',
    HTTPS_CER: undefined,
    HTTPS_DISABLE_HTTP: false,
    HTTPS_ENABLE: false,
    HTTPS_KEY: undefined,
    HTTPS_PASSPHRASE: undefined,
    HTTPS_REDIRECTION: false,
    PORT: 3000
};

const importResult = dotenv.config();
if (importResult.error) {
    console.log(`No environment configuration found at ${__dirname}`);
}

// Getting the values from process.env instead of importResult.parsed so that
// they can directly be injected in Docker through process.env
const environmentConfig = {
    APPS_PATH: process.env.APPS_PATH !== undefined ? process.env.APPS_PATH : defaultConfig.APPS_PATH,
    DEFAULT_APP: process.env.DEFAULT_APP !== undefined ? process.env.DEFAULT_APP : defaultConfig.DEFAULT_APP,
    HTTPS_CER: process.env.HTTPS_CER !== undefined ? process.env.HTTPS_CER : defaultConfig.HTTPS_CER,
    HTTPS_DISABLE_HTTP: process.env.HTTPS_DISABLE_HTTP !== undefined ? JSON.parse(process.env.HTTPS_DISABLE_HTTP) : defaultConfig.HTTPS_DISABLE_HTTP,
    HTTPS_ENABLE: process.env.HTTPS_ENABLE !== undefined ? JSON.parse(process.env.HTTPS_ENABLE) : defaultConfig.HTTPS_ENABLE,
    HTTPS_KEY: process.env.HTTPS_KEY !== undefined ? process.env.HTTPS_KEY : defaultConfig.HTTPS_KEY,
    HTTPS_PASSPHRASE: process.env.HTTPS_PASSPHRASE !== undefined ? process.env.HTTPS_PASSPHRASE : defaultConfig.HTTPS_PASSPHRASE,
    HTTPS_REDIRECTION: process.env.HTTPS_REDIRECTION !== undefined ? JSON.parse(process.env.HTTPS_REDIRECTION) : defaultConfig.HTTPS_REDIRECTION,
    PORT: process.env.PORT !== undefined ? process.env.PORT : defaultConfig.PORT
};

module.exports = environmentConfig;
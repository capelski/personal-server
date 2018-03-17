const tracer = require('./tracer');
const { lstatSync, readdirSync, existsSync } = require('fs');
const { join, normalize } = require('path');

const isDirectory = path => lstatSync(path).isDirectory();

const getDirectoriesName = path => readdirSync(path).filter(name => isDirectory(join(path, name)));

const discoverApps = config => {
	var appsPath = join(__dirname, '..', 'apps');
	var appsFolderName = tracer.trace(getDirectoriesName)(appsPath);
	tracer.info('Discovered ' + appsFolderName.length + ' apps');
	var appsConfig = appsFolderName.map(appName => {
		var appPath = join(appsPath, appName);

		var appConfig = {
			name: appName,
			path: appPath,
			assetsFolder: 'public'
		};

		var configFilePath = join(appPath, 'app-config.json');
		if (existsSync(configFilePath)) {
			var localConfig = require(configFilePath);
			Object.assign(appConfig, localConfig);
		}

		var indexFilePath = join(appPath, 'index.js');
		if (existsSync(indexFilePath)) {
			appConfig.indexFilePath = indexFilePath;
		}

		return appConfig;
	})
	.filter(app => app.indexFilePath != null);

	return appsConfig;
}

module.exports = { discoverApps };

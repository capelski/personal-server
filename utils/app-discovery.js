const tracer = require('./tracer');
const { lstatSync, readdirSync, existsSync } = require('fs');
const { join, normalize } = require('path');

const isDirectory = path => lstatSync(path).isDirectory();

const getDirectoriesName = path => readdirSync(path).filter(name => isDirectory(join(path, name)));

const discoverApps = config => {
	var appsPath = join(__dirname, '..', 'apps');
	var appsFolderName = tracer.trace(getDirectoriesName)(appsPath);
	
	tracer.info('Discovered ' + appsFolderName.length + ' folders');

	var appsConfig = appsFolderName.map(appName => {
		var appPath = join(appsPath, appName);

		var appConfig = {
			name: appName,
			path: appPath,
			assetsFolder: 'public'
		};

		var configFilePath = join(appPath, 'app-config.json');
		if (existsSync(configFilePath)) {
			tracer.info(appName + ': Loading additional configuration');
			var localConfig = require(configFilePath);
			Object.assign(appConfig, localConfig);
		}
		else {
			tracer.info(appName + ': No additional configuration found');
		}

		var indexFilePath = join(appPath, 'index.js');
		if (existsSync(indexFilePath)) {
			tracer.info(appName + ': Loading router configuration');
			appConfig.indexFilePath = indexFilePath;
		}
		else {
			tracer.error(appName + ': No router configuration found');
		}

		return appConfig;
	})
	.filter(app => app.indexFilePath != null);

	tracer.info('Discovered ' + appsConfig.length + ' apps');

	return appsConfig;
}

module.exports = { discoverApps };

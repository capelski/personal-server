const express = require('express');
const { lstatSync, readdirSync, existsSync } = require('fs');
const { join, normalize } = require('path');
const assets = require('express-asset-versions');
const rootPath = normalize(__dirname + '/..');

const isDirectory = path => lstatSync(path).isDirectory();
const getDirectoriesName = path => readdirSync(path).filter(name => isDirectory(join(path, name)));

class AppMapper {

	configure (server, config) {
		var appsPath = join(rootPath, 'apps');
		var appsFolderName = getDirectoriesName(appsPath);
		var appsConfig = appsFolderName.map(appName => {
			var appPath = join(appsPath, appName);

			var appConfig = {
				name: appName,
				path: appPath,
				default: config.defaultApp == appName
			}

			var configFilePath = join(appPath, 'config.json');
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

		var pluginsPath = join(rootPath, 'plugins');

		this.setViewsPaths(server, appsConfig);
		server.use(this.domainAppsResolver(appsConfig).bind(this));
		server.use('/plugins', express.static(pluginsPath));
		server.use(assets('../plugins', pluginsPath));
		appsConfig.forEach(app => this.registerApp(server, app));
	}

	domainAppsResolver (apps) {
		return function (req, res, next) {
			if (req.url.indexOf('plugins') > -1) {
				return next();
			}

			var domain = req.headers.host;
			var relativeUrl = req.url;			
	
			req.url = this.prefixRelativeUrl(apps, domain, relativeUrl);
			return next();
		};
	}

	registerApp (server, appConfig) {
		var appRouter = require(appConfig.indexFilePath);
		var assetsPath = join(appConfig.path, 'public');

		server.use('/' + appConfig.name, express.static(assetsPath));
		server.use(assets('/' + appConfig.name, assetsPath));
		server.use('/' + appConfig.name, appRouter);

		if (appConfig.default) {
			server.use('/', appRouter);
		}
	}

	setViewsPaths (server, apps) {
		var viewsPaths = apps.reduce(function(paths, appConfig) {
			return paths.concat(join(appConfig.path, 'views'));
		}, []);
		server.set('views', viewsPaths);
	}

	prefixRelativeUrl (apps, domain, relativeUrl) {
	    var updatedRelativeUrl = relativeUrl;

		var domainAppAccess = apps.find(app =>
			(app.publicDomains != null &&
				app.publicDomains.find(d => domain.indexOf(d) > -1) != null));
		
	    if (domainAppAccess) {
			var requiredPrefix = '/' + domainAppAccess.name;
			var prefixWithTrailingSlash = requiredPrefix;

			if (relativeUrl == '/') {
				prefixWithTrailingSlash += '/';
				relativeUrl = '';
			}
			
			if (!relativeUrl.startsWith(prefixWithTrailingSlash)) {
				updatedRelativeUrl = requiredPrefix + relativeUrl;
			}
	    }

	    return updatedRelativeUrl;
	}
};

module.exports = new AppMapper();

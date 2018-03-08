const { join } = require('path');
const express = require('express');
const assets = require('express-asset-versions');
var sassCompiler = require('./sass-compiler');

const setViewsPaths = (server, apps) => {
	var viewsPaths =
		apps.reduce((paths, appConfig) => paths.concat(join(appConfig.path, 'views')), []);
	server.set('views', viewsPaths);
};

const prefixRelativeUrl = (apps, domain, relativeUrl) => {
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
};

const domainAppsResolver = apps => 
	(req, res, next) => {
		if (req.url.indexOf('plugins') > -1) {
			return next();
		}

		var domain = req.headers.host;
		var relativeUrl = req.url;			

		req.url = prefixRelativeUrl(apps, domain, relativeUrl);
		return next();
	};

const registerApp = (server, appConfig) => {
	var appRouter = require(appConfig.indexFilePath);
	var assetsPath = join(appConfig.path, appConfig.assetsFolder);

	server.use('/' + appConfig.name, express.static(assetsPath));
	server.use(assets('/' + appConfig.name, assetsPath));
	server.use('/' + appConfig.name, appRouter);

	if (appConfig.default) {
		server.use('/', appRouter);
	}
};

const publishApps = (server, appsConfig) => {
	var pluginsPath = join(__dirname, '..', 'plugins');
	sassCompiler(appsConfig);

	setViewsPaths(server, appsConfig);
	server.use(domainAppsResolver(appsConfig));
	server.use('/plugins', express.static(pluginsPath));
	server.use(assets('../plugins', pluginsPath));
	appsConfig.forEach(app => registerApp(server, app));
};


module.exports = { publishApps };

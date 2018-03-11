const { join } = require('path');
const express = require('express');
const assets = require('express-asset-versions');
var sassCompiler = require('./sass-compiler');
var session = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');
var { getUserManagementUtils } = require('./passport');

const namespaceRelativeUrl = (namespace, relativeUrl) => {
	var requiredPrefix = '/' + namespace;
	var prefixWithTrailingSlash = requiredPrefix;

	if (relativeUrl == '/') {
		prefixWithTrailingSlash += '/';
		relativeUrl = '';
	}
	
	if (!relativeUrl.startsWith(prefixWithTrailingSlash)) {
		relativeUrl = requiredPrefix + relativeUrl;
	}

	return relativeUrl;
};

const getNamespacedRelativeUrl = (apps, domain, relativeUrl) => {
	var domainAppAccess = apps.find(app =>
		(app.publicDomains != null &&
		app.publicDomains.find(d => domain.indexOf(d) > -1) != null));
	
	if (domainAppAccess) {
		relativeUrl = namespaceRelativeUrl(domainAppAccess.name, relativeUrl);
	}

	return relativeUrl;
};

const setToDefaultNamespace = (config, apps, relativeUrl) => {
	var accessedApp = apps.find(app =>
		relativeUrl.startsWith(app.name) || relativeUrl.startsWith('/' + app.name));
		
	if (!accessedApp) {
		relativeUrl = namespaceRelativeUrl(config.defaultApp, relativeUrl);
	}

	return relativeUrl;
};

const appResolver = (config, apps) => 
	(req, res, next) => {
		if (req.url.indexOf('plugins') > -1) {
			return next();
		}

		var domain = req.headers.host;
		var relativeUrl = req.url;			

		req.url = getNamespacedRelativeUrl(apps, domain, relativeUrl);
		req.url = setToDefaultNamespace(config, apps, relativeUrl);
		return next();
	};

const registerApp = (server, config, appConfig) => {
	var assetsPath = join(appConfig.path, appConfig.assetsFolder);
	server.use('/' + appConfig.name, express.static(assetsPath));
	server.use(assets('/' + appConfig.name, assetsPath));

	const jsonMiddleware = bodyParser.json();
	const sessionMiddleware = session({
		secret: config.sessionSecret,
		resave: false,
		saveUninitialized: true,
		name: appConfig.name
	});

	// TODO Provide only on enable authentiaction
	const passportInitialize = passport.initialize();
	const passportSession = passport.session();
	const appMiddleware = {
		bodyParser: jsonMiddleware,
		session: sessionMiddleware,
		passport: [sessionMiddleware, jsonMiddleware, passportInitialize, passportSession]
	};

	const userManagementUtils = getUserManagementUtils(appConfig.name);

	var { configureRouter } = require(appConfig.indexFilePath);
	var appRouter = configureRouter(appMiddleware, { userManagementUtils });
	server.use('/' + appConfig.name, appRouter);
};

const setViewsPaths = (server, apps) => {
	var viewsPaths =
		apps.reduce((paths, appConfig) => paths.concat(join(appConfig.path, 'views')), []);
	server.set('views', viewsPaths);
};

const publishApps = (server, config, appsConfig) => {
	var pluginsPath = join(__dirname, '..', 'plugins');
	sassCompiler(appsConfig);

	setViewsPaths(server, appsConfig);
	server.use(appResolver(config, appsConfig));
	server.use('/plugins', express.static(pluginsPath));
	server.use(assets('../plugins', pluginsPath));
	appsConfig.forEach(app => registerApp(server, config, app));
};

module.exports = { publishApps, getNamespacedRelativeUrl };

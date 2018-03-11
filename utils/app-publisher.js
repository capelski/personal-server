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

const setNamespace = (config, apps, req) => {
	var accessedApp = apps.find(app =>
		req.url.startsWith('/' + app.name + '/') || req.url == '/' + app.name);
		
	if (!accessedApp) {
		req.url = namespaceRelativeUrl(config.defaultApp, req.url);
		req._namespace = config.defaultApp;
	}
	else {
		req._namespace = accessedApp.name;
	}
};

const isolateViewsAccess = (req, res) => {
	res._render = res.render;
	res.render = function(viewName, parameters) {
		var isolateView = req._namespace + '\\views\\' + viewName;
		this._render(isolateView, parameters);
	};
};

const appResolver = (config, apps) => 
	(req, res, next) => {
		if (req.url.indexOf('plugins') > -1) {
			return next();
		}

		var domain = req.headers.host;
		var relativeUrl = req.url;			

		req.url = getNamespacedRelativeUrl(apps, domain, relativeUrl);
		setNamespace(config, apps, req);
		isolateViewsAccess(req, res);
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

const publishApps = (server, config, appsConfig) => {
	// TODO make optional
	sassCompiler(appsConfig);

	var appsFolder = join(__dirname, '..', 'apps');
	server.set('views', appsFolder);

	const pluginsPath = join(__dirname, '..', 'plugins');	
	server.use('/plugins', express.static(pluginsPath));
	server.use(assets('../plugins', pluginsPath));

	server.use(appResolver(config, appsConfig));

	appsConfig.forEach(app => registerApp(server, config, app));
};

module.exports = { publishApps, getNamespacedRelativeUrl };

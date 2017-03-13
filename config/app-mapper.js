var express = require('express');
var path = require('path');
var rootPath = path.normalize(__dirname + '/..');

module.exports = function (server, apps) {

	function appMapper(req, res, next) {
		var domain = req.headers.host;
		var relativeUrl = req.url;

		if (req.url.indexOf('plugins') > -1) {
			return next();
		}

		req.url = updateRelativeUrl(apps, domain, relativeUrl);
		return next();
	}

	function registerApp(app) {
		var appPath = path.join(rootPath, app.appPath);
		var appRouter = require(appPath);

		server.use('/' + app.namespace, express.static(path.join(appPath, 'public')));		
		server.use('/' + app.namespace, appRouter);

		if (app.defaultApp) {
			server.use('/', appRouter);
		}
	}

	function setViewsPaths(apps) {
		var viewsPaths = apps.reduce(function(paths, app) {
			return paths.concat(path.join(rootPath, app.appPath, 'views'));
		}, []);
		server.set('views', viewsPaths);
	}

	function updateRelativeUrl(apps, domain, relativeUrl) {
		var map = apps.reduce(function(map, app) {
			if (map.matched) {
				return map;
			}

			var match = (app.mapToDomain && domain.indexOf(app.namespace) > -1) || (!app.mapToDomain && relativeUrl.startsWith('/' + app.namespace));
			var updatedUrl = app.namespace + map.relativeUrl;
			return {
				relativeUrl: (match && app.mapToDomain) ? updatedUrl : relativeUrl,
				matched: match
			}
		}, {
			relativeUrl: relativeUrl,
			matched: false
		});

		return map.relativeUrl;
	}

	setViewsPaths(apps);
	server.use(appMapper);
	server.use('/plugins', express.static(path.join(rootPath, 'plugins')));
	apps.forEach(registerApp);
};
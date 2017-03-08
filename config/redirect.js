var express = require('express');
var path = require('path');
var rootPath = path.normalize(__dirname + '/..');

module.exports = function (server, apps) {

	server.use(function(req, res, next) {
		var domain = req.headers.host;
		var relativeUrl = req.url;

		if (req.url.indexOf('plugins') > -1) {
			return next();
		}

		var match;
		for(var index = 0; index < apps.length && !match; ++index) {
			var app = apps[index];
			if (app.mapToDomain && domain.indexOf(app.namespace) > -1) {
				relativeUrl = app.namespace + relativeUrl;
				match = true;
			}
			else if (!app.mapToDomain && relativeUrl.startsWith('/' + app.namespace)) {
				match = true;
			}
		}

		/*Default route*/
		if (!match && apps.length > 0) {
			relativeUrl = apps[0].namespace + relativeUrl;
		}

		req.url = relativeUrl;
		return next();
	});

	server.use('/plugins', express.static(path.join(rootPath, 'plugins')));

	apps.forEach(app => {
		var appPath = path.join(rootPath, app.appPath);
		server.use(app.namespace, express.static(path.join(appPath, 'public')));
		
		var appRouter = require(appPath);
		server.use('/' + app.namespace, appRouter);
	});

	var viewsPaths = apps.reduce(function(paths, app) {
		return paths.concat(path.join(rootPath, app.appPath, 'views'));
	}, []);
	server.set('views', viewsPaths);
};
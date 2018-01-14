var express = require('express');
var path = require('path');
var assets = require('express-asset-versions');
var rootPath = path.normalize(__dirname + '/..');

class AppMapper {

	configure (server, apps) {
		var pluginsPath = path.join(rootPath, 'plugins');

		this.setViewsPaths(server, apps);
		server.use(this.urlResolver(apps).bind(this));
		server.use('/plugins', express.static(pluginsPath));
		server.use(assets('../plugins', pluginsPath));
		apps.forEach(app => this.registerApp(server, app));
	}

	urlResolver (apps) {
		return function (req, res, next) {
			var domain = req.headers.host;
			var relativeUrl = req.url;
	
			if (req.url.indexOf('plugins') > -1) {
				return next();
			}
	
			req.url = this.updateRelativeUrl(apps, domain, relativeUrl);
			return next();
		};
	}

	registerApp (server, app) {
		var appPath = path.join(rootPath, app.appPath);
		var appRouter = require(appPath);
		var assetsPath = path.join(appPath, 'public');

		server.use('/' + app.namespace, express.static(assetsPath));
		server.use(assets('/' + app.namespace, assetsPath));
		server.use('/' + app.namespace, appRouter);

		if (app.defaultApp) {
			server.use('/', appRouter);
		}
	}

	setViewsPaths (server, apps) {
		var viewsPaths = apps.reduce(function(paths, app) {
			return paths.concat(path.join(rootPath, app.appPath, 'views'));
		}, []);
		server.set('views', viewsPaths);
	}

	updateRelativeUrl (apps, domain, relativeUrl) {
	    var updatedRelativeUrl = relativeUrl;

	    var targetedApp = apps.find(app =>
	        (app.domain != null && domain.indexOf(app.domain) > -1) ||
	        (app.domain == null && relativeUrl.startsWith('/' + app.namespace))
	    );
		
	    if (targetedApp && targetedApp.domain != null) {
	        updatedRelativeUrl = '/' + targetedApp.namespace + relativeUrl;
	    }

	    return updatedRelativeUrl;
	}
};

module.exports = new AppMapper();

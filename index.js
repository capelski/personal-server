const express = require('express');
const { exposeHostedApps, httpsRedirectMiddleware, launchServer } = require('modena');
const { join } = require('path');

const configuration = require('./configuration');
console.log('Server configuration');
console.log(configuration);

const mainApp = express();
mainApp.set('view engine', 'ejs');

if (configuration.HTTPS_ENABLE && configuration.HTTPS_REDIRECTION) {
    mainApp.use(httpsRedirectMiddleware);
}

const staticFolder = join(__dirname, 'static');
mainApp.use(express.static(staticFolder, { dotfiles: 'allow' }));
const defaultFavicon = join(__dirname, 'static', 'favicon.png');

exposeHostedApps(mainApp, {
	appsPath: configuration.APPS_PATH,
	defaultApp: configuration.DEFAULT_APP
})
    .then(_ => {
		mainApp.use((req, res, next) => {
			if (req.url.indexOf('favicon.ico') > -1) {
				return res.sendFile(defaultFavicon);
			}

			console.info('Url ' + req.url + ' was not found');
		
			return res.status(404).render('error-page', {
				title: 'Not found',
				statusCode: 404,
				message: 'The url you are looking for does not exist'
			});
		});
		
		mainApp.use((err, req, res, next) => {
			console.error('Unhandled exception was raised');
			console.error(err);
		
			return res.status(500).render('error-page', {
				title: 'Error',
				statusCode: 500,
				message: 'There is some error in the code :/'
			});
		});

		const serverConfig = {
			port: configuration.PORT,
			httpsConfiguration: {
				certPath: configuration.HTTPS_CER,
				disableHttp: configuration.HTTPS_DISABLE_HTTP,
				enableHttps: configuration.HTTPS_ENABLE,
				keyPath: configuration.HTTPS_KEY,
				passphrase: configuration.HTTPS_PASSPHRASE,
				port: configuration.HTTPS_PORT
			}
		};

		launchServer(mainApp, serverConfig);
	})
	.catch(console.log);
	
// TODO Use winston instead of console
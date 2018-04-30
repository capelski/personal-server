var winston = require('winston');

const configureWinston = config => {
	if (config.enableConsoleLogs == "false") {
		winston.remove(winston.transports.Console);	
	}
	
	if (config.logFilename && config.logFilename.length > 0) {
		winston.add(winston.transports.File, {
			filename: config.logFilename
		});
	}
};

module.exports = { configureWinston };

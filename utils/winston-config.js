var winston = require('winston');

const configureWinston = config => {
	if (!config.logs.console) {
		winston.remove(winston.transports.Console);	
	}
	
	if (config.logs.file && config.logs.file.length && config.logs.file.length > 0) {
		winston.add(winston.transports.File, {
			filename: config.logs.file
		});
	}
};

module.exports = { configureWinston };

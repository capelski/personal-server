var path = require('path');
var fs = require('fs');
var sass = require('node-sass');

module.exports = function (apps) {

	function ensureDirectory(directoryPath) {
		if (!fs.existsSync(directoryPath)){
		    fs.mkdirSync(directoryPath);
		}
	}

	function compileSassFiles(appName, inputFile, outputFile) {
		if (fs.existsSync(inputFile)) {
			sass.render({
				file: inputFile
			}, function(error, result) {
				if (error) {
					console.log(error);
				}
				else {
					fs.writeFile(outputFile, result.css.toString(), error => {
						if (error) {
							console.log(error);
						} else {
							console.log(appName, 'SASS successfully compiled!');
						}
					})
				}
			});
		}
	}

	var rootPath = path.normalize(__dirname + '/..');
	apps.forEach((app) => {
		var inputFile = path.join(rootPath, app.appPath, 'sass', 'main.scss');

		var outputDirectory = path.join(rootPath, app.appPath, 'public', 'css');
		var outputFile = path.join(outputDirectory, 'main.css');
		ensureDirectory(outputDirectory);

		compileSassFiles(app.namespace, inputFile, outputFile);
	});
};
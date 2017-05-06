var path = require('path');
var fs = require('fs');
var sass = require('node-sass');

module.exports = function (apps) {

	function ensureDirectory(directoryPath) {
		if (!fs.existsSync(directoryPath)){
		    fs.mkdirSync(directoryPath);
		}
	}

	function compileSassFile(inputFile, outputFile) {
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
						}
					})
				}
			});
		}
	}

	function compileSassFiles(inputDirectory, outputDirectory) {
		var filenames = fs.readdirSync(inputDirectory);
		filenames.forEach(filename => {
			var inputFile = path.join(inputDirectory, filename);
			var outputFile = path.join(outputDirectory, filename.replace('.scss', '.css'));
			compileSassFile(inputFile, outputFile)
		});
	}

	var rootPath = path.normalize(__dirname + '/..');
	apps.forEach((app) => {
		var inputDirectory = path.join(rootPath, app.appPath, 'sass');
		var publicDirectory = path.join(rootPath, app.appPath, 'public');
		var outputDirectory = path.join(publicDirectory, 'css');

		ensureDirectory(inputDirectory);
		ensureDirectory(publicDirectory);
		ensureDirectory(outputDirectory);

		compileSassFiles(inputDirectory, outputDirectory);
	});
};
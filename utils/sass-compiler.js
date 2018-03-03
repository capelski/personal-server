var { existsSync, mkdirSync, writeFile, readdirSync } = require('fs');
var { join } = require('path');
var { render } = require('node-sass');

const ensureDirectory = directoryPath => {
	if (!existsSync(directoryPath)){
		mkdirSync(directoryPath);
	}
};

const compileSassFile = (inputFile, outputFile) => {
	if (existsSync(inputFile)) {
		var input = {
			file: inputFile
		};
		var callback = function(error, result) {
			if (error) {
				console.log(error);
			}
			else {
				writeFile(outputFile, result.css.toString(), error => {
					if (error) {
						console.log(error);
					}
				})
			}
		};
		render(input, callback);
	}
};

const compileSassFiles = (inputDirectory, outputDirectory) => {
	var filenames = readdirSync(inputDirectory);
	filenames.forEach(filename => {
		var inputFile = join(inputDirectory, filename);
		var outputFile = join(outputDirectory, filename.replace('.scss', '.css'));
		compileSassFile(inputFile, outputFile);
	});
};

const compileSassApps = apps => {
	apps.forEach((app) => {
		var inputDirectory = join(__dirname, '..', app.path, 'sass');
		var publicDirectory = join(__dirname, '..', app.path, 'public');
		var outputDirectory = join(publicDirectory, 'css');

		if (existsSync(inputDirectory)) {
			ensureDirectory(publicDirectory);
			ensureDirectory(outputDirectory);
			compileSassFiles(inputDirectory, outputDirectory);
		}
	});
};

module.exports = compileSassApps;

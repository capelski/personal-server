var path = require('path');
var fs = require('fs');
var sass = require('node-sass');

module.exports = function (apps) {

	function compileSassFiles(inputFile, outputFile) {
		if (!fs.existsSync(inputFile)) {
		    console.log('The file ' + inputFile + ' does not exist');
		    return null;
		}

		return sass.render({
			file: inputFile
		}, function(error, result) {
			if (error) {
				console.log(error);
			}
			else {
				fs.writeFile(outputFile, result.css.toString(), error => {
					if(error) {
						console.log(error)
					}
				})
			}
		});
	}

	var rootPath = path.normalize(__dirname + '/..');
	apps.forEach((app) => {
		var inputFile = path.join(rootPath, app.appPath, 'sass', 'main.scss');
		var outputFile = path.join(rootPath, app.appPath, 'public', 'css', 'main.css');
		compileSassFiles(inputFile, outputFile);
	});
};
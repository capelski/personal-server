function CanvasService() {

	var resizeTimeout;

	function renderMatrix(canvas, matrix, pieceSize, fillColor, backgroundColor) {
		return new Promise((resolve, reject) => {

			var canvasContext = canvas.getContext('2d');
	  		canvasContext.fillStyle = backgroundColor || 'white';
  			canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  			canvasContext.fillStyle = fillColor;

			for (var i = 0; i < matrix.length; ++i) {			
				for (var j= 0; j < matrix[i].length; ++j) {
					if (matrix[i][j]) {
						canvasContext.fillRect(j * pieceSize, i * pieceSize, pieceSize, pieceSize);
					}
				}
			}

			resolve();
		});
  	}

	function resizeCanvas(canvas, width, height) {
		return new Promise((resolve, reject) => {

			if(resizeTimeout) {
				clearTimeout(resizeTimeout);
			}

			resizeTimeout = setTimeout(function() {
				// In mobile browsers, the window height does not include the address bar;
				// we get the actual height through the fractalWrapper instead of the window
				canvas.width = width;
				canvas.height = height;
				resolve();
			}, 500);
		});
	}

	return {
		renderMatrix,
		resizeCanvas
	};
}

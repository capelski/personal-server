document.addEventListener("DOMContentLoaded", function(event) {

	var fractalService = new FractalService();
	var fractal = fractalService.create();
	var htmlNodes = {
		fractalPicture: document.getElementById('fractal-picture'),
		fractalControls: document.getElementById('fractal-controls'),
		rowsNumber: document.getElementById('rows-number'),
		columnsNumber: document.getElementById('columns-number'),
		pattern: document.getElementById('pattern'),
		zoomOut: document.getElementById('zoom-out'),
		fractalDrawer: document.getElementById('fractal-drawer'),
		loader: document.getElementById('loader')
	};
	htmlNodes.canvasContext = htmlNodes.fractalPicture.getContext('2d');
	var resizeCanvasTimeout;

	var prompt = {
		body: '<p>In the near future you will be able to modify the fill color in this modal. The behaviour is not yet implemented</p>',
		buttons: {
			cancel: {
				title: 'Cancel',
				fn: basicModal.close
			},
			action: {
				title: 'Select',
				fn: function() {
					patternSectionHandler(prompt.event);
					basicModal.close();
				}
			}
		},
		event: null,
		setEvent: function(event) {
			this.event = event;
			return this;
		}
	};

	function fillCanvas(fractalResult) {
		var piecePixelSize = htmlNodes.fractalPicture.width / fractal.resultColumns;
  		htmlNodes.canvasContext.fillStyle = 'skyblue';

		for (var i = 0; i < fractalResult.length; ++i) {			
			for (var j= 0; j < fractalResult[i].length; ++j) {
				if (fractalResult[i][j]) {
					htmlNodes.canvasContext.fillRect(j * piecePixelSize, i * piecePixelSize, piecePixelSize, piecePixelSize);
				}
			}
		}

  		setTimeout(() => {
			htmlNodes.fractalPicture.style.display = 'block';
  			htmlNodes.loader.style.display = 'none';
  		}, 1000);
  	}

	function fractalDrawerHandler() {			
      	htmlNodes.fractalControls.classList.remove('show');
      	htmlNodes.loader.style.display = 'block';
		htmlNodes.canvasContext.fillStyle = 'white';
  		htmlNodes.canvasContext.clearRect(0, 0, htmlNodes.fractalPicture.width, htmlNodes.fractalPicture.height);
  		htmlNodes.fractalPicture.style.display = 'none';
		
		fractal.zoomOut = parseInt(htmlNodes.zoomOut.value);
		fractal.resultRows = Math.pow(fractal.patternRows, fractal.zoomOut);
		fractal.resultColumns = Math.pow(fractal.patternColumns, fractal.zoomOut);

      	return fractalService.computeFractal(fractal, sectionValueRetriever)
      	.then(fillCanvas);
	}

	function gridDrawerHandler() {
		fractal.patternRows = parseInt(htmlNodes.rowsNumber.value);
		fractal.patternColumns = parseInt(htmlNodes.columnsNumber.value);

		var grid = '';
		for (var i = 0; i < fractal.patternRows; ++i) {
			for (var j= 0; j < fractal.patternColumns; ++j) {
				grid += '<span class="pattern-section" data-row="' + i + '"" data-column="' + j + '" data-checked="false"></span>';
			}
			grid += '<br />';
		}
		htmlNodes.pattern.innerHTML = grid;
		var sections = document.getElementsByClassName('pattern-section');
		for (var key in sections) {
			if (sections.hasOwnProperty(key)) {
				var section = sections[key];
				section.addEventListener('click', patternSectionHandler);
				// section.addEventListener('click', function(event) {
				// 	basicModal.show(prompt.setEvent(event));
				// });
			}
		}
	}

	function patternSectionHandler(event) {
		var target = event.target;
		target.classList.toggle('checked');
	}

	function resizeCanvas() {
		if(resizeCanvasTimeout) {
			clearTimeout(resizeCanvasTimeout);
		}
		resizeCanvasTimeout = setTimeout(function() {
			var canvasSize = Math.min(window.innerWidth, window.innerHeight);
			htmlNodes.fractalPicture.width = canvasSize;
			htmlNodes.fractalPicture.height = canvasSize;
			if(fractal.result && fractal.result.length > 0) {
				fillCanvas(fractal.result);
			}
		}, 400);
	}

	function sectionValueRetriever (row, column) {
		var currentSection = document.querySelector('#pattern span[data-row="' + row + '"][data-column="' + column + '"]');
		var sectionClasses = Array.from(currentSection.classList);
		return sectionClasses.indexOf('checked') > -1;
	}

	htmlNodes.rowsNumber.addEventListener('keyup', gridDrawerHandler);
	htmlNodes.columnsNumber.addEventListener('keyup', gridDrawerHandler);
	htmlNodes.fractalDrawer.addEventListener('click', fractalDrawerHandler);
	window.addEventListener('resize', resizeCanvas);

	gridDrawerHandler();
	resizeCanvas();
});

document.addEventListener("DOMContentLoaded", function(event) {

	var fractalService = new FractalService();
	var canvasService = new CanvasService();
	var fractal = fractalService.create('#7EC0EE');
	var htmlNodes = {
		canvas: document.getElementById('fractal-picture'),
		colorPickerIcon: document.getElementById('color-picker'),
		columnsLabel: document.getElementById('columns-label'),
		columnsNumber: document.getElementById('columns-number'),
		fractalControls: document.getElementById('fractal-controls'),
		fractalDrawer: document.getElementById('fractal-drawer'),
		fractalWrapper: document.getElementById('fractal-wrapper'),
		loader: document.getElementById('loader'),
		pattern: document.getElementById('pattern'),
		reloaderIcon: document.getElementById('reloader'),
		rowsLabel: document.getElementById('rows-label'),
		rowsNumber: document.getElementById('rows-number'),
		zoomLabel: document.getElementById('zoom-label'),
		zoomOut: document.getElementById('zoom-out')
	};

	function fractalDrawerHandler() {			
      	htmlNodes.fractalControls.classList.remove('show');
      	htmlNodes.loader.style.display = 'block';
  		htmlNodes.canvas.style.display = 'none';
		
		fractal.zoomOut = parseInt(htmlNodes.zoomOut.value);
		fractal.resultRows = Math.pow(fractal.patternRows, fractal.zoomOut);
		fractal.resultColumns = Math.pow(fractal.patternColumns, fractal.zoomOut);

      	return fractalService.computeFractal(fractal, sectionValueRetriever)
      	.then(renderCanvas);
	}

	function gridDrawerHandler() {
		htmlNodes.rowsLabel.textContent = htmlNodes.rowsNumber.value;
		htmlNodes.columnsLabel.textContent = htmlNodes.columnsNumber.value;
		fractal.patternRows = parseInt(htmlNodes.rowsNumber.value);
		fractal.patternColumns = parseInt(htmlNodes.columnsNumber.value);

		var grid = '';
		for (var i = 0; i < fractal.patternRows; ++i) {
			grid += '<div>';
			for (var j= 0; j < fractal.patternColumns; ++j) {
				var maybeColorizable = Math.round(Math.random() * 100) % 2 === 1 ? ' colorizable': '';
				grid += '<span class="pattern-section' + maybeColorizable + '" data-row="' + i + '"" data-column="' + j + '"></span>';
			}
			grid += '</div>';
		}
		htmlNodes.pattern.innerHTML = grid;
		var sections = document.getElementsByClassName('pattern-section');
		for (var key in sections) {
			if (sections.hasOwnProperty(key)) {
				var section = sections[key];
				section.addEventListener('click', patternSectionHandler);
			}
		}
	}

	function patternSectionHandler(event) {
		var target = event.target;
		target.classList.toggle('colorizable');
	}

	function renderCanvas(fractalResult) {
		if(fractalResult && fractalResult.length > 0) {
			var pieceSize = htmlNodes.canvas.width / fractal.resultColumns;
			return canvasService.renderMatrix(htmlNodes.canvas, fractalResult, pieceSize, fractal.displayColor)
			.then(() => {
				setTimeout(() => {
					htmlNodes.canvas.style.display = 'block';
		  			htmlNodes.loader.style.display = 'none';
		  		}, 1000);
			});
		}
	}

	function sectionValueRetriever (row, column) {
		var currentSection = document.querySelector('#pattern span[data-row="' + row + '"][data-column="' + column + '"]');
		var sectionClasses = Array.from(currentSection.classList);
		return sectionClasses.indexOf('colorizable') > -1;
	}

	function updateCanvasSize() {
		// In mobile browsers, the window height does not include the address bar;
		// we get the actual height through the fractalWrapper instead of the window
		var size = Math.min(htmlNodes.fractalWrapper.clientWidth, htmlNodes.fractalWrapper.clientHeight);
		canvasService.resizeCanvas(htmlNodes.canvas, size, size)
		.then(() => {
			renderCanvas(fractal.result);
		});
	}

	htmlNodes.colorPickerIcon.addEventListener('click', () => {
		window.colorPickerCustom.pick(fractal.displayColor)
		.then((selectedColor) => {
			window.generics.updateCSSProperty('main.css', '.colorizable', 'background-color', selectedColor, true);
			fractal.displayColor = selectedColor;
			renderCanvas(fractal.result);
		});
	});
	htmlNodes.reloaderIcon.addEventListener('click', () => {
		gridDrawerHandler();
		fractalDrawerHandler();
	});
	htmlNodes.rowsNumber.addEventListener('input', gridDrawerHandler);
	htmlNodes.columnsNumber.addEventListener('input', gridDrawerHandler);
	htmlNodes.zoomOut.addEventListener('input', () => {
		htmlNodes.zoomLabel.textContent = htmlNodes.zoomOut.value
	});
	htmlNodes.fractalDrawer.addEventListener('click', fractalDrawerHandler);
	window.addEventListener('resize', updateCanvasSize);

	updateCanvasSize();
	gridDrawerHandler();
	fractalDrawerHandler();
});

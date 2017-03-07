document.addEventListener("DOMContentLoaded", function(event) {

	var fractalService = new FractalService();
	var canvasService = new CanvasService();
	var fractal = fractalService.create();
	var htmlNodes = {
		canvas: document.getElementById('fractal-picture'),
		colorPicker: document.getElementById('color-picker'),
		columnsLabel: document.getElementById('columns-label'),
		columnsNumber: document.getElementById('columns-number'),
		fractalControls: document.getElementById('fractal-controls'),
		fractalDrawer: document.getElementById('fractal-drawer'),
		fractalWrapper: document.getElementById('fractal-wrapper'),
		loader: document.getElementById('loader'),
		pattern: document.getElementById('pattern'),
		reloader: document.getElementById('reloader'),
		rowsLabel: document.getElementById('rows-label'),
		rowsNumber: document.getElementById('rows-number'),
		zoomLabel: document.getElementById('zoom-label'),
		zoomOut: document.getElementById('zoom-out')
	};
	var fractalColor = '#7EC0EE';

	function colorPickerHandler() {
		basicModal.show({
			body: `<p>Choose the color you want the the fractal pictures to be painted in:</p>
					<input id="jscolor" class="jscolor" value="` + fractalColor + `">
			`,
			buttons: {
				cancel: {
					title: 'Cancel',
					fn: basicModal.close
				},
				action: {
					title: 'Select',
					fn: function() {
						fractalColor = '#' + document.getElementById('jscolor').value;
						updateCSSClassProperty('fractal-pictures.css', '.colorizable', 'background-color', fractalColor, true)
						renderCanvas(fractal.result);
						basicModal.close();
					}
				}
			}
		});
		renderColorPicker();
	}

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
			for (var j= 0; j < fractal.patternColumns; ++j) {
				var maybeColorizable = Math.round(Math.random() * 100) % 2 === 1 ? ' colorizable': '';
				grid += '<span class="pattern-section' + maybeColorizable + '" data-row="' + i + '"" data-column="' + j + '"></span>';
			}
			grid += '<br />';
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
			return canvasService.renderMatrix(htmlNodes.canvas, fractalResult, pieceSize, fractalColor)
			.then(() => {
				setTimeout(() => {
					htmlNodes.canvas.style.display = 'block';
		  			htmlNodes.loader.style.display = 'none';
		  		}, 1000);
			});
		}
	}

	function renderColorPicker() {
		jscolor.installByClassName('jscolor');
		var mousedownEvent = document.createEvent('MouseEvents');
		mousedownEvent.initEvent('mousedown', true, false);
		document.getElementById('jscolor').dispatchEvent(mousedownEvent);
		document.getElementById('jscolor').style.display = 'none';
		//This is not the fanciest way to do it, but we can grab the color picker as the last element of the body:
		var bodyNodes = Array.from(document.body.childNodes);
		var colorPicker = bodyNodes[bodyNodes.length - 1];
		colorPicker.style.left = 'calc(50% - 120px)';
		colorPicker.style.top = 'calc(50% - 60px)';
		document.getElementsByClassName('basicModal__content')[0].style.height = '300px';
	}

	function sectionValueRetriever (row, column) {
		var currentSection = document.querySelector('#pattern span[data-row="' + row + '"][data-column="' + column + '"]');
		var sectionClasses = Array.from(currentSection.classList);
		return sectionClasses.indexOf('colorizable') > -1;
	}

	function updateCanvasSize() {
		var size = Math.min(htmlNodes.fractalWrapper.clientWidth, htmlNodes.fractalWrapper.clientHeight);
		canvasService.resizeCanvas(htmlNodes.canvas, size, size)
		.then(() => {
			renderCanvas(fractal.result);
		});
	}

	function updateCSSClassProperty(fileName, classSelector, propertyName, propertyValue, important) {
		var styleSheet = Array.from(document.styleSheets).find(styleSheet => styleSheet.href.endsWith(fileName));
		var rule = Array.from(styleSheet.rules).find(rule => rule.selectorText === classSelector);
		rule.style.setProperty (propertyName, propertyValue, important ? "important" : "");
	}

	htmlNodes.colorPicker.addEventListener('click', colorPickerHandler);
	htmlNodes.reloader.addEventListener('click', () => { gridDrawerHandler(); fractalDrawerHandler(); });
	htmlNodes.rowsNumber.addEventListener('input', gridDrawerHandler);
	htmlNodes.columnsNumber.addEventListener('input', gridDrawerHandler);
	htmlNodes.zoomOut.addEventListener('input', () => htmlNodes.zoomLabel.textContent = htmlNodes.zoomOut.value);
	htmlNodes.fractalDrawer.addEventListener('click', fractalDrawerHandler);
	window.addEventListener('resize', updateCanvasSize);

	updateCanvasSize();
	gridDrawerHandler();
	fractalDrawerHandler();
});

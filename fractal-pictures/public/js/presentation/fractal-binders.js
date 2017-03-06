document.addEventListener("DOMContentLoaded", function(event) {

	var fractalService = new FractalService();
	var fractal = fractalService.create();
	var htmlNodes = {
		colorPicker: document.getElementById('color-picker'),
		columnsLabel: document.getElementById('columns-label'),
		columnsNumber: document.getElementById('columns-number'),
		fractalControls: document.getElementById('fractal-controls'),
		fractalDrawer: document.getElementById('fractal-drawer'),
		fractalPicture: document.getElementById('fractal-picture'),
		fractalWrapper: document.getElementById('fractal-wrapper'),
		loader: document.getElementById('loader'),
		pattern: document.getElementById('pattern'),
		rowsLabel: document.getElementById('rows-label'),
		rowsNumber: document.getElementById('rows-number'),
		zoomLabel: document.getElementById('zoom-label'),
		zoomOut: document.getElementById('zoom-out')
	};
	htmlNodes.canvasContext = htmlNodes.fractalPicture.getContext('2d');
	var fractalColor = '#7EC0EE';
	var resizeCanvasTimeout;

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
						redrawCanvas();
						basicModal.close();
					}
				}
			}
		});
		renderColorPicker();
	}

	function fillCanvas(fractalResult) {
		var piecePixelSize = htmlNodes.fractalPicture.width / fractal.resultColumns;
  		htmlNodes.canvasContext.fillStyle = fractalColor;

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

	function redrawCanvas() {
		if(fractal.result && fractal.result.length > 0) {
			fillCanvas(fractal.result);
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

	function resizeCanvas() {
		if(resizeCanvasTimeout) {
			clearTimeout(resizeCanvasTimeout);
		}
		resizeCanvasTimeout = setTimeout(function() {
			// In mobile browsers, the window height does not include the address bar;
			// we get the actual height through the fractalWrapper instead of the window
			var canvasSize = Math.min(window.innerWidth, htmlNodes.fractalWrapper.clientHeight);
			htmlNodes.fractalPicture.width = canvasSize;
			htmlNodes.fractalPicture.height = canvasSize;
			redrawCanvas();
		}, 400);
	}

	function sectionValueRetriever (row, column) {
		var currentSection = document.querySelector('#pattern span[data-row="' + row + '"][data-column="' + column + '"]');
		var sectionClasses = Array.from(currentSection.classList);
		return sectionClasses.indexOf('colorizable') > -1;
	}

	function updateCSSClassProperty(fileName, classSelector, propertyName, propertyValue, important) {
		var styleSheet = Array.from(document.styleSheets).find(styleSheet => styleSheet.href.endsWith(fileName));
		var rule = Array.from(styleSheet.rules).find(rule => rule.selectorText === classSelector);
		rule.style.setProperty (propertyName, propertyValue, important ? "important" : "");
	}

	htmlNodes.colorPicker.addEventListener('click', colorPickerHandler);
	htmlNodes.rowsNumber.addEventListener('input', gridDrawerHandler);
	htmlNodes.columnsNumber.addEventListener('input', gridDrawerHandler);
	console.log( htmlNodes.zoomLabel.textContent)
	htmlNodes.zoomOut.addEventListener('input', () => htmlNodes.zoomLabel.textContent = htmlNodes.zoomOut.value);
	htmlNodes.fractalDrawer.addEventListener('click', fractalDrawerHandler);
	window.addEventListener('resize', resizeCanvas);

	gridDrawerHandler();
	resizeCanvas();
	fractalDrawerHandler();
});

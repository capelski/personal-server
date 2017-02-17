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

	function domValueRetriever (row, column) {
		var currentSection = document.querySelector('#pattern span[data-row="' + row + '"][data-column="' + column + '"]');
		var sectionClasses = Array.from(currentSection.classList);
		return sectionClasses.indexOf('checked') > -1;
	}

	function fractalDrawerHandler() {			
      	htmlNodes.fractalControls.classList.remove('show');
      	htmlNodes.loader.style.display = 'block';
		htmlNodes.fractalPicture.innerHTML = '';
		
		fractal.zoomOut = parseInt(htmlNodes.zoomOut.value);
		fractal.resultRows = Math.pow(fractal.patternRows, fractal.zoomOut);
		fractal.resultColumns = Math.pow(fractal.patternColumns, fractal.zoomOut);

		var fractalWidth = htmlNodes.fractalPicture.clientWidth;
		var piecePixelSize = fractalWidth / fractal.resultColumns;
		var piecePercentageSize = Math.floor(piecePixelSize * 100 * 100 / fractalWidth) / 100;

      	return new Promise((resolve, reject) => {
			fractalService.updatePattern(fractal, domValueRetriever);
			var fractalResult = '';
			for (var i = 0; i < fractal.resultRows; ++i) {			
				for (var j= 0; j < fractal.resultColumns; ++j) {
					var positionValue = fractalService.getBoxValue(fractal, i, j);
					fractalResult += '<span class="piece ' + (positionValue ? 'colorful' : '') + '" style="width: ' + piecePercentageSize
					 + '%; height:' + piecePercentageSize + '%;"></span>';
				}
				fractalResult += '<br />';
			}
			resolve(fractalResult);
      	})
      	.then((fractalResult) => {
      		setTimeout(() => {
      			htmlNodes.fractalPicture.innerHTML = fractalResult;
      			htmlNodes.loader.style.display = 'none';
      		}, 1000);
      	});		
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

	htmlNodes.rowsNumber.addEventListener('keyup', gridDrawerHandler);
	htmlNodes.columnsNumber.addEventListener('keyup', gridDrawerHandler);
	htmlNodes.fractalDrawer.addEventListener('click', fractalDrawerHandler);
	gridDrawerHandler();
});

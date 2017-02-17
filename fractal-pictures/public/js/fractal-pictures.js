document.addEventListener("DOMContentLoaded", function(event) {

	var fractalService = new FractalService();
	var fractal = fractalService.create();

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
		
		fractalService.updatePattern(fractal, domValueRetriever);

		var fractalPicture = document.getElementById('fractal-picture');
		var fractalControls = document.getElementById('fractal-controls');
		var loader = document.getElementById('loader');
		
      	fractalControls.classList.remove('show');
      	loader.style.display = 'block';
		
		fractal.zoomOut = parseInt(document.getElementById('zoom-out').value);
		fractal.resultRows = Math.pow(fractal.patternRows, fractal.zoomOut);
		fractal.resultColumns = Math.pow(fractal.patternColumns, fractal.zoomOut);

		var fractalWidth = fractalPicture.clientWidth;
		var piecePixelSize = fractalWidth / fractal.resultColumns;
		var piecePercentageSize = Math.floor(piecePixelSize * 100 * 100 / fractalWidth) / 100;

      	return new Promise((resolve, reject) => {
			var fractalResult = '';
			for(var i = 0; i < fractal.resultRows; ++i) {			
				for(var j= 0; j < fractal.resultColumns; ++j) {
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
      			fractalPicture.innerHTML = fractalResult;
      			loader.style.display = 'none';
      		}, 1000);
      	});		
	}

	function gridDrawerHandler() {
		fractal.patternRows = parseInt(document.getElementById('rows-number').value);
		fractal.patternColumns = parseInt(document.getElementById('columns-number').value);

		var grid = '';
		for(var i = 0; i < fractal.patternRows; ++i) {
			for(var j= 0; j < fractal.patternColumns; ++j) {
				grid += '<span class="pattern-section" data-row="' + i + '"" data-column="' + j + '" data-checked="false"></span>';
			}
			grid += '<br />';
		}
		document.getElementById('pattern').innerHTML = grid;
		var sections = document.getElementsByClassName('pattern-section');
		for(var key in sections) {
			if (sections.hasOwnProperty(key)) {
				var section = sections[key];
				// section.addEventListener('click', patternSectionHandler);
				section.addEventListener('click', function(event) {
					basicModal.show(prompt.setEvent(event));
				});
			}
		}
	}

	function patternSectionHandler(event) {
		var target = event.target;
		target.classList.toggle('checked');
	}

	document.getElementById('rows-number').addEventListener('keyup', gridDrawerHandler);
	document.getElementById('columns-number').addEventListener('keyup', gridDrawerHandler);
	document.getElementById('fractal-drawer').addEventListener('click', fractalDrawerHandler);
	gridDrawerHandler();
});

document.addEventListener("DOMContentLoaded", function(event) { 

	var patternRows;
	var patternColumns;
	var pattern;
	var zoomOut;
	var fractalRows;
	var fractalColumns;
	var fractal;

	function fractalDrawerHandler() {
		
		updatePattern();

		var fractalPicture = document.getElementById('fractal-picture');
		fractalPicture.innerHTML = 
		`<div class="sk-cube-grid">
	        <div class="sk-cube sk-cube1"></div>
	        <div class="sk-cube sk-cube2"></div>
	        <div class="sk-cube sk-cube3"></div>
	        <div class="sk-cube sk-cube4"></div>
	        <div class="sk-cube sk-cube5"></div>
	        <div class="sk-cube sk-cube6"></div>
	        <div class="sk-cube sk-cube7"></div>
	        <div class="sk-cube sk-cube8"></div>
	        <div class="sk-cube sk-cube9"></div>
      	</div>`;
      	document.getElementById('fractal-controls').classList.remove('show');
		
		zoomOut = parseInt(document.getElementById('zoom-out').value);
		fractalRows = Math.pow(patternRows, zoomOut);
		fractalColumns = Math.pow(patternColumns, zoomOut);

		var fractalWidth = fractalPicture.clientWidth;
		var piecePixelSize = fractalWidth / fractalColumns;
		var piecePercentageSize = Math.floor(piecePixelSize * 100 * 100 / fractalWidth) / 100;

      	return new Promise((resolve, reject) => {
			var fractal = '';
			for(var i = 0; i < fractalRows; ++i) {			
				for(var j= 0; j < fractalColumns; ++j) {
					var positionValue = fractalPosition(i, j);
					fractal += '<span class="piece ' + (positionValue ? 'colorful' : '') + '" style="width: ' + piecePercentageSize
					 + '%; height:' + piecePercentageSize + '%;"></span>';
				}
				fractal += '<br />';
			}
			resolve(fractal);
      	})
      	.then((fractal) => {
      		setTimeout(() => {
      			fractalPicture.innerHTML = fractal;
      		}, 1000);
      	});		
	}

	function fractalPosition(currentRow, currentColumn) {
		var currentFractal = {
			rowsNumber: fractalRows,
			columnsNumber: fractalColumns,
			correspondingRow: currentRow,
			correspondingColumn: currentColumn
		};
		var nextFractal = {};
		var iterationsNumber = zoomOut;
		var result = iterationsNumber > 0;
		    
		while (result && iterationsNumber > 0) {

			nextFractal.rowsNumber = currentFractal.rowsNumber / patternRows;
			nextFractal.correspondingRow = currentFractal.correspondingRow % nextFractal.rowsNumber;

			nextFractal.columnsNumber = currentFractal.columnsNumber / patternColumns;
			nextFractal.correspondingColumn = currentFractal.correspondingColumn % nextFractal.columnsNumber;

			var correspondingPatternRow = Math.floor(currentFractal.correspondingRow / nextFractal.rowsNumber);
			var correspondingPatternColumn = Math.floor(currentFractal.correspondingColumn / nextFractal.columnsNumber);
			result = pattern[correspondingPatternRow][correspondingPatternColumn];

			--iterationsNumber;
			currentFractal.rowsNumber = nextFractal.rowsNumber;
			currentFractal.columnsNumber = nextFractal.columnsNumber;
			currentFractal.correspondingRow = nextFractal.correspondingRow;
			currentFractal.correspondingColumn = nextFractal.correspondingColumn;
		}

		return result;
	}

	function gridDrawerHandler() {
		patternRows = parseInt(document.getElementById('rows-number').value);
		patternColumns = parseInt(document.getElementById('columns-number').value);

		var grid = '';
		for(var i = 0; i < patternRows; ++i) {
			for(var j= 0; j < patternColumns; ++j) {
				// grid += '<input type="checkbox" data-row="' + i + '"" data-column="' + j + '" />';
				grid += '<span class="pattern-section" data-row="' + i + '"" data-column="' + j + '" data-checked="false"></span>';
			}
			grid += '<br />';
		}
		document.getElementById('pattern').innerHTML = grid;
		var sections = document.getElementsByClassName('pattern-section');
		for(var key in sections) {
			if (sections.hasOwnProperty(key)) {
				var section = sections[key];
				section.addEventListener('click', patternSectionHandler);
			}
		}
	}

	function patternSectionHandler(event) {
		var target = event.target;
		target.classList.toggle('checked');
	}

	function updatePattern() {
		pattern = [];
		for(var i = 0; i < patternRows; ++i) {
			pattern.push([]);
			var currentRow = pattern[pattern.length - 1];
			for(var j= 0; j < patternColumns; ++j) {
				var currentSection = document.querySelector('#pattern span[data-row="' + i + '"][data-column="' + j + '"]');
				var sectionClasses = Array.from(currentSection.classList);
				currentRow.push(sectionClasses.indexOf('checked') > -1);
			}
		}
	}

	document.getElementById('rows-number').addEventListener('keyup', gridDrawerHandler);
	document.getElementById('columns-number').addEventListener('keyup', gridDrawerHandler);
	document.getElementById('fractal-drawer').addEventListener('click', fractalDrawerHandler);
	gridDrawerHandler();
});

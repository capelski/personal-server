document.addEventListener("DOMContentLoaded", function(event) { 

	var patternRows;
	var patternColumns;
	var pattern;
	var growthFactor;
	var fractalRows;
	var fractalColumns;
	var fractal;

	function fractalDrawerHandler() {
		updatePattern();
		console.log(pattern)
		growthFactor = parseInt(document.getElementById('growth-factor').value);

		fractalRows = Math.pow(patternRows, growthFactor);
		fractalColumns = Math.pow(patternColumns, growthFactor);
		var pieceSize = Math.min(10, Math.max(1, Math.floor(window.screen.width / fractalRows)));

		var fractal = '';
		for(var i = 0; i < fractalRows; ++i) {			
			for(var j= 0; j < fractalColumns; ++j) {
				var positionValue = fractalPosition(i, j);
				fractal += '<span class="piece ' + (positionValue ? 'colorful' : '') + '" style="width: ' + pieceSize
				 + 'px; height:' + pieceSize + 'px;"></span>';
			}
			fractal += '<br />';
		}
		document.getElementById('fractal-picture').innerHTML = fractal;	
	}

	function fractalPosition(currentRow, currentColumn) {
		var currentFractal = {
			rowsNumber: fractalRows,
			columnsNumber: fractalColumns,
			correspondingRow: currentRow,
			correspondingColumn: currentColumn
		};
		var iterationsNumber = growthFactor;
		var result = iterationsNumber > 0;
		var correspondingPatternRow, correspondingPatternColumn;	
		    
		while (result && iterationsNumber > 0) {

			currentFractal.rowsNumber /= patternRows;
			correspondingPatternRow = Math.floor(currentFractal.correspondingRow / currentFractal.rowsNumber);
			currentFractal.correspondingRow = currentFractal.correspondingRow % currentFractal.rowsNumber;

			currentFractal.columnsNumber /= patternColumns;
			correspondingPatternColumn = Math.floor(currentFractal.correspondingColumn / currentFractal.columnsNumber);
			currentFractal.correspondingColumn = currentFractal.correspondingColumn % currentFractal.columnsNumber;

			result = pattern[correspondingPatternRow][correspondingPatternColumn];
			--iterationsNumber;
		}

		return result;
	}

	function gridDrawerHandler() {
		patternRows = parseInt(document.getElementById('rows-number').value);
		patternColumns = parseInt(document.getElementById('columns-number').value);

		var grid = '';
		for(var i = 0; i < patternRows; ++i) {
			for(var j= 0; j < patternColumns; ++j) {
				grid += '<input type="checkbox" data-row="' + i + '"" data-column="' + j + '" />';
			}
			grid += '<br />';
		}
		document.getElementById('pattern').innerHTML = grid;
	};

	function updatePattern() {
		pattern = [];
		for(var i = 0; i < patternRows; ++i) {
			pattern.push([]);
			var currentRow = pattern[pattern.length - 1];
			for(var j= 0; j < patternColumns; ++j) {
				currentRow.push(document.querySelector('#pattern input[data-row="' + i + '"][data-column="' + j + '"]').checked);
			}
		}
	}

	document.getElementById('grid-drawer').addEventListener('click', gridDrawerHandler);
	document.getElementById('fractal-drawer').addEventListener('click', fractalDrawerHandler);
});

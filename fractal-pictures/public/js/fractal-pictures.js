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
		growthFactor = parseInt(document.getElementById('growth-factor').value);

		fractalRows = Math.pow(patternRows, growthFactor);
		fractalColumns = Math.pow(patternColumns, growthFactor);
		var pieceSize = Math.min(10, Math.max(1, Math.floor(window.screen.width / fractalRows)));

		var fractal = '';
		for(var i = 0; i < fractalRows; ++i) {			
			for(var j= 0; j < fractalRows; ++j) {
				var positionValue = fractalPosition(i, j);
				fractal += '<span class="piece ' + (positionValue ? 'colorful' : '') + '" style="width: ' + pieceSize
				 + 'px; height:' + pieceSize + 'px;"></span>';
			}
			fractal += '<br />';
		}
		document.getElementById('fractal-picture').innerHTML = fractal;	
	}

	function fractalPosition(currentRow, currentColumn) {
		var previousFractal = {
			rowsNumber: fractalRows,
			columnsNumber: fractalColumns
		};
		var iterationsNumber = growthFactor;
		var result = true;
		/*var previousBlockRowsNumber = fractalRows;
		var previousBlockColumnsNumber = fractalColumns;*/
		var previousBlockRow;
		var previousBlockColumn;
		
		if (iterationsNumber === 0) {
			return false;
		}		
		    
		while (iterationsNumber > 0 && result) {
			if (previousFractal.rowsNumber >= patternRows) {
				previousFractal.rowsNumber /= patternRows;
				previousBlockRow = Math.floor(currentRow / previousFractal.rowsNumber);
				currentRow = currentRow % previousFractal.rowsNumber;
			}
			if (previousFractal.columnsNumber >= patternColumns) {
				previousFractal.columnsNumber /= patternColumns;
				previousBlockColumn = Math.floor(currentColumn / previousFractal.columnsNumber);
				currentColumn = currentColumn % previousFractal.columnsNumber;
			}
			result = pattern[previousBlockRow][previousBlockColumn];
			--iterationsNumber;
		}

		return result;
	}

	function gridDrawerHandler() {
		patternRows = document.getElementById('rows-number').value;
		patternColumns = document.getElementById('columns-number').value;

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

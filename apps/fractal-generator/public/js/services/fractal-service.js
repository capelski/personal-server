function FractalService() {

	function create(displayColor) {
		return new Fractal(displayColor);
	}

	function getSectionValue(fractal, boxRow, boxColumn) {
		var currentFractal = {
			rowsNumber: fractal.resultRows,
			columnsNumber: fractal.resultColumns,
			correspondingRow: boxRow,
			correspondingColumn: boxColumn
		};
		var nextFractal = {};
		var iterationsNumber = fractal.zoomOut;
		var result = iterationsNumber > 0;
		    
		while (result && iterationsNumber > 0) {

			nextFractal.rowsNumber = currentFractal.rowsNumber / fractal.patternRows;
			nextFractal.correspondingRow = currentFractal.correspondingRow % nextFractal.rowsNumber;

			nextFractal.columnsNumber = currentFractal.columnsNumber / fractal.patternColumns;
			nextFractal.correspondingColumn = currentFractal.correspondingColumn % nextFractal.columnsNumber;

			var correspondingPatternRow = Math.floor(currentFractal.correspondingRow / nextFractal.rowsNumber);
			var correspondingPatternColumn = Math.floor(currentFractal.correspondingColumn / nextFractal.columnsNumber);
			result = fractal.pattern[correspondingPatternRow][correspondingPatternColumn];

			--iterationsNumber;
			currentFractal.rowsNumber = nextFractal.rowsNumber;
			currentFractal.columnsNumber = nextFractal.columnsNumber;
			currentFractal.correspondingRow = nextFractal.correspondingRow;
			currentFractal.correspondingColumn = nextFractal.correspondingColumn;
		}

		return result;
	}

	function computeFractal(fractal, sectionValueRetriever) {
		return new Promise(function(resolve, reject) {
			fractal.pattern = [];
			for (var i = 0; i < fractal.patternRows; ++i) {
				fractal.pattern.push([]);
				var currentRow = fractal.pattern[fractal.pattern.length - 1];
				for (var j = 0; j < fractal.patternColumns; ++j) {
					currentRow.push(sectionValueRetriever(i, j));
				}
			}

			fractal.result = [];
			for (var i = 0; i < fractal.resultRows; ++i) {			
				fractal.result.push([]);
				var currentRow = fractal.result[fractal.result.length - 1];
				for (var j = 0; j < fractal.resultColumns; ++j) {
					currentRow.push(getSectionValue(fractal, i, j));
				}
			}

			resolve(fractal.result);
		});

		
	}

	return {
		create: create,
		computeFractal: computeFractal
	};
	
}
function Fractal(displayColor) {
	this.patternRows = 0;
	this.patternColumns = 0;
	this.pattern = [[]];
	this.zoomOut = 0;
	this.resultRows = 0;
	this.resultColumns = 0;
	this.result = [[]];
	this.displayColor = displayColor || '#7EC0EE';
}
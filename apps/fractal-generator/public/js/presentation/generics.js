window.generics = (function() {

	function updateCSSProperty(filename, classSelector, propertyName, propertyValue, important) {
		var styleSheet = Array.from(document.styleSheets).find(styleSheet => styleSheet.href.indexOf(filename) > -1);
		var rule = Array.from(styleSheet.rules).find(rule => rule.selectorText === classSelector);
		rule.style.setProperty (propertyName, propertyValue, important ? "important" : "");
	}

	return {
		updateCSSProperty
	};
})();
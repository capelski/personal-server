window.generics = (function() {

	function updateCSSProperty(fileName, classSelector, propertyName, propertyValue, important) {
		var styleSheet = Array.from(document.styleSheets).find(styleSheet => styleSheet.href.endsWith(fileName));
		var rule = Array.from(styleSheet.rules).find(rule => rule.selectorText === classSelector);
		rule.style.setProperty (propertyName, propertyValue, important ? "important" : "");
	}

	return {
		updateCSSProperty
	};
})();
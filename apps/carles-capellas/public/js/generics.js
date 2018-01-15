function equalizeHeight(elementsSelector, minimumHeight) {
	if(minimumHeight === undefined) {
		minimumHeight = 0;
	}
	var maxHeight = minimumHeight;
	$(elementsSelector).each(function(index) {
		$(this).height('initial');
		if($(this).height() > maxHeight)
			maxHeight = $(this).height();
	});
	$(elementsSelector).each(function(index) {
		$(this).height(maxHeight);
	});
} 
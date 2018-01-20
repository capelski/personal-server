$().ready(function() {

	Navigation.initialize();

	$('path[data-pig-part]').on('click', function() {
		$('.part-container').hide();
		var pigPart = $(this).data('pig-part');
		$('.part-container[data-pig-part=' + pigPart + ']').show();
	});
	
});
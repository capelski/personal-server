$(function() {
	var clientData;

	$.ajax({
		method: 'GET',
		url: 'client-side',
		dataType: 'json'
	})
	.then(function (clientDataResponse) {
		clientData = clientDataResponse;
		return $.ajax({
			method: 'GET',
			url: 'api/elements',
			dataType: 'json'
		});
	})
	.then(function (elements) {
		var itemsList = $('#elements-list');
		elements.forEach(function(element) {
			itemsList.append('<p>' + element.name + '</p>');
		});
	})
	.fail(function(response) {
		// TODO Toaster
		console.log('Error', response);
	});
});
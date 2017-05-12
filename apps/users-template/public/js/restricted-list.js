$(function() {
	var clientData;

	$.ajax({
		method: 'GET',
		url: '/users-template/client-side',
		dataType: 'json'
	})
	.then(function (clientDataResponse) {
		clientData = clientDataResponse;
		return $.ajax({
			method: 'GET',
			url: '/users-template/api/restricted',
			dataType: 'json'
		});
	})
	.then(function (elements) {
		var itemsList = $('#elements-list');
		elements.forEach(function(element) {
			itemsList.append('<p><a href="/users-template/restricted/details?id=' + element.id + '">' + element.name + '</a></p>');
		});
	})
	.fail(function(response) {
		// TODO Toaster
		console.log('Error', response);
	});
});
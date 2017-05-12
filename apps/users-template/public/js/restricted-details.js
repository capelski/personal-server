$(function() {
	var clientData;
	var elementWrapper = $('#element-wrapper');

	$.ajax({
		method: 'GET',
		url: '/users-template/client-side',
		dataType: 'json'
	})
	.then(function (clientDataResponse) {
		clientData = clientDataResponse;
		return $.ajax({
			method: 'GET',
			url: '/users-template/api/restricted/getById',
			dataType: 'json',
			data: {
				id: elementWrapper.data('element-id')
			}
		});
	})
	.then(function (element) {
		 // TODO Fill all the required HTML
		elementWrapper.html(element.name);
	})
	.fail(function(response) {
		// TODO Toaster
		console.log('Error', response);
	});
});
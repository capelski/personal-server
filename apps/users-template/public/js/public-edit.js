$(function() {
	pageLoad();
	var elementWrapper = $('#element-wrapper');
	var elementName = $('#element-name');
	var elementId = elementWrapper.data('element-id');

	function pageLoad() {

		$('#update-button').on('click', function() {
			$.ajax({
				method: 'PUT',
				url: '/users-template/api/public',
				contentType: 'application/json',
				data: JSON.stringify({
					id: elementId,
					name: elementName.val()
				})
			})
			.then(function (element) {
				// TODO
				document.location.href = '/users-template/public/details?id=' + elementId;
			})
			.fail(function(response) {
				// TODO
				console.log('Ko');
			});
		});

		window.application.authentication.subscribe(function(user) {
			if (user) {
				return $.ajax({
					method: 'GET',
					url: '/users-template/api/public/getById',
					dataType: 'json',
					data: {
						id: elementId
					}
				})
				.then(function (element) {
					 // TODO Fill all the required HTML
					elementName.val(element.name);
				})
				.fail(function(response) {
					elementWrapper.html('<b>Unauthorized</b>');
					// TODO Toaster
					console.log('Error', response);
				});
			}
			else {
				elementWrapper.html('<b>Unauthorized</b>');
			}
		});
		window.application.authentication.pageLoad();
	}
});
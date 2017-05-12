$(function() {
	pageLoad();

	function pageLoad() {
		window.application.authentication.subscribe(function(user) {
			var elementWrapper = $('#element-wrapper');
			if (user) {
				return $.ajax({
					method: 'GET',
					url: '/users-template/api/public/getById',
					dataType: 'json',
					data: {
						id: elementWrapper.data('element-id')
					}
				})
				.then(function (element) {
					 // TODO Fill all the required HTML
					elementWrapper.html(element.name);
				})
				.fail(function(response) {
					// TODO Toaster
					console.log('Error', response);
				});
			}
			else {
				elementWrapper.html('<b>Unauthorized</b>');	
			}
		});
	}
});
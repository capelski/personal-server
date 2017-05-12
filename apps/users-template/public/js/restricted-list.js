$(function() {
	pageLoad();

	function pageLoad() {
		window.application.authentication.subscribe(function(user) {
			var itemsList = $('#elements-list');
			if (user) {
				return $.ajax({
					method: 'GET',
					url: '/users-template/api/restricted',
					dataType: 'json'
				})
				.then(function (elements) {
					itemsList.empty();
					elements.forEach(function(element) {
						itemsList.append('<p><a href="/users-template/restricted/details?id=' + element.id + '">' + element.name + '</a></p>');
					});
				})
				.fail(function(response) {
					// TODO Toaster
					console.log('Error', response);
				});
			}
			else {
				itemsList.html('<b>Unauthorized</b>');	
			}
		});
	}
});
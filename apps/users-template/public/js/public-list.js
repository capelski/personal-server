$(function() {
	var itemsList = $('#elements-list');
	var unauthorizedMsg = $('#unauthorized-msg');

	pageLoad();

	function pageLoad() {
		window.application.authentication.subscribe(function(user) {
			if (user) {
				return $.ajax({
					method: 'GET',
					url: '/users-template/api/public',
					dataType: 'json'
				})
				.then(function (elements) {
					unauthorizedMsg.addClass('hidden');
					itemsList.empty();
					elements.forEach(function(element) {
						itemsList.append('<p><a href="/users-template/public/details?id=' + element.id + '">' + element.name + '</a></p>');
					});
					itemsList.removeClass('hidden');
				})
				.fail(function(response) {
					// TODO If 401 -> Display 401; Otherwise, display error
					itemsList.addClass('hidden');
					unauthorizedMsg.removeClass('hidden');
				});
			}
			else {
				itemsList.addClass('hidden');
				unauthorizedMsg.removeClass('hidden');
			}
		});
		window.application.authentication.pageLoad(['public:view']);
	}
});
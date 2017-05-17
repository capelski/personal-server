$(function() {
	var itemsList = $('#elements-list');
	var unauthorizedMsg = $('#unauthorized-msg');

	pageLoad();

	function pageLoad() {
		window.application.authentication.subscribe(function(user) {
			itemsList.addClass('hidden');
			itemsList.empty();
			unauthorizedMsg.addClass('hidden');

			if (user && window.application.userHasPermission(user, 'restricted:view')) {
				return $.ajax({
					method: 'GET',
					url: '/users-template/api/restricted',
					dataType: 'json'
				})
				.then(function (elements) {
					elements.forEach(function(element) {
						itemsList.append('<p><a href="/users-template/restricted/details?id=' + element.id + '">' + element.name + '</a></p>');
					});
					itemsList.removeClass('hidden');
				})
				.fail(window.application.ajaxFailHandler);
			}
			else {
				unauthorizedMsg.removeClass('hidden');
			}
		});
		window.application.authentication.pageLoad(['restricted:view']);
	}
});
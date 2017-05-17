$(function() {
	var elementWrapper = $('#element-wrapper');
	var unauthorizedMsg = $('#unauthorized-msg');
	
	pageLoad();

	function pageLoad() {
		window.application.authentication.subscribe(function(user) {
			elementWrapper.addClass('hidden');
			unauthorizedMsg.addClass('hidden');

			if (user && window.application.userHasPermission(user, 'restricted:view')) {
				return $.ajax({
					method: 'GET',
					url: '/users-template/api/restricted/getById',
					dataType: 'json',
					data: {
						id: elementWrapper.data('element-id')
					}
				})
				.then(function (element) {
					elementWrapper.html(element.name);
					elementWrapper.removeClass('hidden');
				})
				.fail(window.application.ajaxFailHandler);
			}
			else {
				unauthorizedMsg.removeClass('hidden');
			}
		});
		window.application.authentication.pageLoad(['restricted:view', 'restricted:edit', 'restricted:delete']);
	}
});
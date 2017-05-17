$(function() {
	var elementWrapper = $('#element-wrapper');
	var unauthorizedMsg = $('#unauthorized-msg');
	
	pageLoad();

	function pageLoad() {
		window.application.authentication.subscribe(function(user) {
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
					unauthorizedMsg.addClass('hidden');
					elementWrapper.html(element.name);
					elementWrapper.removeClass('hidden');
				})
				.fail(function(response) {
					// TODO If 401 -> Display 401; Otherwise, display error
					elementWrapper.addClass('hidden');
					unauthorizedMsg.removeClass('hidden');
				});
			}
			else {
				elementWrapper.addClass('hidden');
				unauthorizedMsg.removeClass('hidden');
			}
		});
		window.application.authentication.pageLoad(['public:view', 'public:edit', 'public:delete']);
	}
});
$(function() {
	pageLoad();
	var elementWrapper = $('#element-wrapper');
	var elementName = $('#element-name');
	var elementId = elementWrapper.data('element-id');
	var unauthorizedMsg = $('#unauthorized-msg');

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
				document.location.href = '/users-template/public/details?id=' + elementId;
			})
			.fail(window.application.ajaxFailHandler);
		});

		window.application.authentication.subscribe(function(user) {
			elementWrapper.addClass('hidden');
			unauthorizedMsg.addClass('hidden');

			if (user && window.application.userHasPermission(user, 'public:edit')) {
				return $.ajax({
					method: 'GET',
					url: '/users-template/api/public/getById',
					dataType: 'json',
					data: {
						id: elementId
					}
				})
				.then(function (element) {
					elementName.val(element.name);
					elementWrapper.removeClass('hidden');
				})
				.fail(window.application.ajaxFailHandler);
			}
			else {
				unauthorizedMsg.removeClass('hidden');
			}
		});
		window.application.authentication.pageLoad(['public:edit']);
	}
});
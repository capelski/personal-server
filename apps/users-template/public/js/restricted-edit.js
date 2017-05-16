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
				url: '/users-template/api/restricted',
				contentType: 'application/json',
				data: JSON.stringify({
					id: elementId,
					name: elementName.val()
				})
			})
			.then(function (element) {
				document.location.href = '/users-template/restricted/details?id=' + elementId;
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
					url: '/users-template/api/restricted/getForEditById',
					dataType: 'json',
					data: {
						id: elementId
					}
				})
				.then(function (element) {
					unauthorizedMsg.addClass('hidden');
					elementName.val(element.name);
					elementWrapper.removeClass('hidden');
				})
				.fail(function(response) {
					elementWrapper.addClass('hidden');
					unauthorizedMsg.removeClass('hidden');
				});
			}
			else {
				elementWrapper.addClass('hidden');
				unauthorizedMsg.removeClass('hidden');
			}
		});
		window.application.authentication.pageLoad();
	}
});
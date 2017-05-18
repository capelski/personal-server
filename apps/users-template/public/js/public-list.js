$(function() {
	var itemsList = $('#elements-list');
	var createButton = $('#create-button');
	var unauthorizedMsg = $('#unauthorized-msg');

	pageLoad();

	function pageLoad() {
		window.application.authentication.subscribe(function(user) {
			itemsList.addClass('hidden');
			itemsList.empty();
			createButton.addClass('hidden');
			unauthorizedMsg.addClass('hidden');

			if (user && window.application.userHasSomePermission(user, ['public:view', 'public:create'])) {
				if (window.application.userHasPermission(user, 'public:view')) {
					$.ajax({
						method: 'GET',
						url: '/users-template/api/public',
						dataType: 'json'
					})
					.then(function (elements) {
						elements.forEach(function(element) {
							itemsList.append('<p><a href="/users-template/public/details?id=' + element.id + '">' + element.name + '</a></p>');
						});
						itemsList.removeClass('hidden');
					})
					.fail(window.application.ajaxFailHandler);
				}

				if (window.application.userHasPermission(user, 'public:create')) {
					createButton.removeClass('hidden');
				}
			}
			else {
				unauthorizedMsg.removeClass('hidden');
			}
		});
		window.application.authentication.pageLoad(['public:view', 'public:create']);
	}
});
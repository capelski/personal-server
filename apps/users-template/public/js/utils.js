$(function() {
	window.application = window.application || {};

	window.application.ajaxFailHandler = function (response) {
		$('#error-msg').html((response.responseJSON && response.responseJSON.message) || response.responseText);
		$('#error-msg').removeClass('hidden');
	};

	window.application.userHasPermission = function (user, permission) {
		return user && user.permissions && user.permissions.indexOf(permission) > -1;
	};

	window.application.userHasSomePermission = function (user, permissions) {
		return permissions.filter(permission => window.application.userHasPermission(user, permission)).length > 0;
	};
});
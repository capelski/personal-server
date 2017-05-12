$(function() {
	var authenticationListeners = [];
	window.application = window.application || {};
	window.application.authentication = window.application.authentication || {};
	window.application.authentication.subscribe = function(listener) {
		if (typeof listener === "function") {
			authenticationListeners.push(listener);
		}
	};

	pageLoad();

	function authenticationHandler(user) {
		if (user) {
			$('#logged-username').html(user.username);
			$('#login-form').addClass('hidden');
			$('#user-wrapper').removeClass('hidden');
		}
		else {
			$('#logged-username').html('-');
			$('#login-form').removeClass('hidden');
			$('#user-wrapper').addClass('hidden');
		}

		for(var key in authenticationListeners) {
			var listener = authenticationListeners[key];
			listener(user);
		}
	}

	function bindLoginForm() {
		$('#log-in').on('click', function() {
			$.ajax({
				method: 'POST',
				url: '/users-template/log-in',
				contentType: 'application/json',
				data: JSON.stringify({
					username: $('#username').val(),
					password: $('#password').val()
				})
			})
			.then(authenticationHandler)
			.fail(function(response) {
				// TODO Toastr
				$('#logged-username').html(response.responseJSON.message);
			});
		});

		$('#log-out').on('click', function() {
			$.ajax({
				method: 'POST',
				url: '/users-template/log-out'
			})
			.then(function() {
				authenticationHandler(null);
			})
			.fail(function(response) {
				// TODO Toastr
				$('#logged-username').html(response.responseJSON.message);
			});
		});
	}

	function pageLoad() {
		bindLoginForm();
		return $.ajax({
			method: 'GET',
			url: '/users-template/client-side',
			dataType: 'json'
		})
		.then(function (clientData) {
			window.application.clientData = clientData;
			authenticationHandler(clientData.user);
		});
	}
});
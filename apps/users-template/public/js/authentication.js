$(function() {
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
		.then(function(loggedUser) {
			$('#logged-username').html(loggedUser.username);
			$('#login-form').addClass('hidden');
			$('#user-wrapper').removeClass('hidden');
		})
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
		.then(function(loggedUser) {
			$('#logged-username').html('-');
			$('#login-form').removeClass('hidden');
			$('#user-wrapper').addClass('hidden');
		})
		.fail(function(response) {
			// TODO Toastr
			$('#logged-username').html(response.responseJSON.message);
		});
	});
});
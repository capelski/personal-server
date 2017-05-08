$(function() {
	$('#log-in').on('click', function() {
		$.ajax({
			method: 'POST',
			url: 'log-in',
			contentType: 'application/json',
			data: JSON.stringify({
				username: $('#username').val(),
				password: $('#password').val()
			})
		})
		.then(function(loggedUser) {
			$('#logged-username').html(loggedUser.username);
			$('#user-wrapper').removeClass('hidden');
		})
		.fail(function(response) {
			$('#logged-username').html(response.responseJSON.message);
		});
	});

	$('#log-out').on('click', function() {
		$.ajax({
			method: 'POST',
			url: 'log-out'
		})
		.then(function(loggedUser) {
			$('#logged-username').html('-');
			$('#user-wrapper').addClass('hidden');
		})
		.fail(function(response) {
			$('#logged-username').html(response.responseJSON.message);
		});
	});
});
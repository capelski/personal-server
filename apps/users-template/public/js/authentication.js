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
			$('#log-out').removeClass('hidden');
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
			$('#log-out').addClass('hidden');
		})
		.fail(function(response) {
			$('#logged-username').html(response.responseJSON.message);
		});
	});
});
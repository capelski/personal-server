$(function() {
	$('#authentication-button').on('click', function() {
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
		})
		.fail(function(response) {
			$('#logged-username').html(response.responseJSON.message);
		});
	});
});
ContentModule.controller('ContactCtrl', ['$scope', function($scope) {
	$scope.$on('pageTranslated', function(event, args) {
	    $scope.contact = $scope.contactContent[args.language];
	});
	$scope.contactContent = {
		'ca': {
			Text: "Envia'm un correu a <b>capellas.carles@gmail.com</b>",
			MailPlaceholder: "Correu electrònic",
			MessagePlaceholder: "Missatge",
			MailError: "Falta indicar el correu electrònic",
			MessageError: "Falta escriure el missatge",
			Send: "Enviar",
			Confirmation: "Correu enviat correctament",
			Error: "No s'ha pogut enviar el correu"
		},
		'es': {
			Text: "Mandame un correo a <b>capellas.carles@gmail.com</b>",
			MailPlaceholder: "Correo electónico",
			MessagePlaceholder: "Mensaje",
			MailError: "Falta indicar el correo electónico",
			MessageError: "Falta escrivir el mensaje",
			Send: "Enviar",
			Confirmation: "Correo enviado correctamente",
			Error: "No se ha podido mandar el correo"
		},
		'en': {
			Text: "Send me an email to <b>capellas.carles@gmail.com</b>",
			MailPlaceholder: "Mail address",
			MessagePlaceholder: "Message",
			MailError: "E-mail address not entered",
			MessageError: "The message is missing",
			Send: "Send",
			Confirmation: "The mail was succesfully send",
			Error: "The mail could not be send"
		}
	}
	$scope.contact = $scope.contactContent['ca'];
	$scope.sendMail = function () {

		$('#contactError').empty();
		if($scope.senderMail == undefined || $scope.senderMail == "") {
			displayError($scope.contact.MailError);
			return false;
		}
		if($scope.message == undefined || $scope.message == "") {
			displayError($scope.contact.MessageError);
			return false;
		}

		$.ajax({
            type: 'POST',
            url: 'php/send-mail.php',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                sender: $scope.senderMail,
                message: $scope.message
            }),
            success: function(response) {
				hideContactForm();
				$scope.senderMail = '';
				$scope.message = '';
				alertSuccess($scope.contact.Confirmation);
			},
			error: function(response) {
				alertError($scope.contact.Error);
			}
        });
	}
}]);

function showContactForm() {
	$('.contact-container').show(500);
	$('.contact-button').removeClass('palette-text-1 palette-bg-4');
	$('.contact-button').addClass('opened palette-text-4 palette-bg-1');
	$('.contact-button > i').removeClass('fa-envelope-o');
	$('.contact-button > i').addClass('fa-times');
}

function hideContactForm() {
	$('.contact-container').hide(500);
	$('.contact-button').removeClass('opened palette-text-4 palette-bg-1');
	$('.contact-button').addClass('palette-text-1 palette-bg-4');
	$('.contact-button > i').removeClass('fa-times');
	$('.contact-button > i').addClass('fa-envelope-o');
}

function toggleContactForm() {
	var visibility = $('.contact-container').css('display');
	if(visibility == 'none') {
		showContactForm();
	} else {
		hideContactForm();
	}
}

function displayError(error) {
	$('#contactError').hide();
	$('#contactError').html(error);
	$('#contactError').fadeIn(1000);
	setTimeout(function() {
		$('#contactError').fadeOut(1000, function() {
			$('#contactError').empty();
		});
	}, 3000);
}

ContentModule.controller('AlertsCtrl', ['$scope', function($scope) {
	$scope.$on('pageTranslated', function(event, args) {
	    $scope.alerts = $scope.alertsContent[args.language];
	});
	$scope.alertsContent = {
		'ca': {
			Success: 'Fet!',
			Error: 'Error!'
		},
		'es': {
			Success: 'Hecho!',
			Error: 'Error!'
		},
		'en': {
			Success: 'Done!',
			Error: 'Error!'
		}
	}
	$scope.alerts = $scope.alertsContent['ca'];
	$scope.alertSuccess = function(message) {
		$scope.messageClass = 'alert-success';
		$scope.action = $scope.alerts.Success;
		$scope.description = message;
		displayAlert();
	}
	$scope.alertError = function(message) {
		$scope.messageClass = 'alert-danger';
		$scope.action = $scope.alerts.Error;
		$scope.description = message;
		displayAlert();
	}
}]);

function displayAlert() {
	$('#alerts').fadeIn(1000, function() {
		setTimeout(function() {
			$('#alerts').fadeOut(1000);
		}, 4000);		
	});
}

function alertSuccess(message) {
	var scope = angular.element('[ng-controller=AlertsCtrl]').scope();
	safeApply(scope, function() { scope.alertSuccess(message) });
}

function alertError(message) {
	var scope = angular.element('[ng-controller=AlertsCtrl]').scope();
	safeApply(scope, function() {scope.alertError(message)});
}
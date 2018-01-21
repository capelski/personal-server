var ContentModule = angular.module('Content', [])
	.filter('html', function($sce) {
		return $sce.trustAsHtml;
	})
	.controller('ContentCtrl', ['$scope', function($scope) {
		$scope.currentLanguage = 'ca';
		$scope.translate = function(language) {
			$scope.currentLanguage = language;
	    	$scope.general = $scope.generalContent[language];
			$scope.$broadcast('pageTranslated', {"language": $scope.currentLanguage});
			if(typeof(translateCallback) == 'function') {
				/*We need the delay to let Angular update the content of the page*/
				safeDelayedApply($scope, translateCallback);
			}
		};
		$scope.generalContent = {
			'ca': {
				SoftwareEngineer : "Enginyer informàtic"
			},
			'es': {
				SoftwareEngineer : "Ingeniero informático"
			},
			'en': {
				SoftwareEngineer : "Software engineer"
			}
		}
		$scope.general = $scope.generalContent['ca'];
	}]);

function safeApply(scope, fn) {
    (scope.$$phase || scope.$root.$$phase) ? fn() : scope.$apply(fn);
}

function safeDelayedApply(scope, fn, time) {
	if(time == undefined) {
		time = 50;
	}
	setTimeout(function() {
			safeApply(scope, fn);       		
	}, time);
}
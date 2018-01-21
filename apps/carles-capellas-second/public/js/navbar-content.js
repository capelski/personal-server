
ContentModule.controller('NavbarCtrl', ['$scope', function($scope) {
	$scope.$on('pageTranslated', function(event, args) {
	    $scope.navbar = $scope.navbarContent[args.language];
		/*We need the timeout to let Angular update the content of the page*/
    	setTimeout(function() {
			Navigation.updateActiveTab(true);       		
    	}, 100);
	});
	$scope.navbarContent = {
		'ca': {
			ToggleNavigation : "Alternar navegació",
			Home : "Portada",
			Curriculum : "Currículum",
			Projects : "Projectes",
			Language : "Idioma",
			Catalan : "Català",
			Spanish : "Castellà",
			English : "Anglès",
		},
		'es': {
			ToggleNavigation : "Alternar navegación",
			Home : "Inicio",
			Curriculum : "Currículum",
			Projects : "Proyectos",
			Language : "Idioma",
			Catalan : "Catalán",
			Spanish : "Español",
			English : "Inglés",
		},
		'en': {
			ToggleNavigation : "Toggle navigation",
			Home : "Home",
			Curriculum : "Resume",
			Projects : "Projects",
			Language : "Language",
			Catalan : "Catalan",
			Spanish : "Spanish",
			English : "English",
		}
	}
	$scope.navbar = $scope.navbarContent['ca'];
}]);
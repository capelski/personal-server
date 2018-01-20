var app = angular.module('ItequiaPong', ['ngRoute']);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when("/", {
        templateUrl : '/itequia-pong/templates/ranking.html'
    })
    .when("/player-details/:playerName?", {
        templateUrl : '/itequia-pong/templates/player-details.html',
        controller: 'PlayerCtrl'
    })
    .when("/register-match", {
        templateUrl : '/itequia-pong/templates/register-match.html',
        controller: 'RegisterMatchCtrl'
    })
    .otherwise({
        redirectTo: '/'
    });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: true
    });
});

app.filter('range', function() {
	return function(input, min, max) {
		min = parseInt(min);
		max = parseInt(max);
		for (var i = min; i <= max; i++) {
			input.push(i);			
		}
		return input;
	};
});
var app = angular.module('DragonPong', ['ngRoute']);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
        templateUrl : '/dragon-pong/templates/ranking.html'
    })
    .when('/player-details/:playerName?', {
        templateUrl : '/dragon-pong/templates/player-details.html',
        controller: 'PlayerCtrl'
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
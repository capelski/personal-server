var app = angular.module('ItequiaPong');

app.controller('RegisterMatchCtrl', function($scope, $http) {

    $scope.scoreA = 0;
    $scope.scoreB = 0;

    $scope.addMatch = function() {
        var newMatch = {
            playerA: $scope.playerA,
            scoreA: $scope.scoreA,
            playerB: $scope.playerB,
            scoreB: $scope.scoreB
        };
        $http({
            method: 'POST',
            url: 'excel-data/register-match.php',
            data: {
                match: newMatch,
                token: localStorage.token
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function(response) {
            $scope.matches.unshift(newMatch);
            $scope.updateScores($scope.players, $scope.matches);
            console.log(response);
        }).catch(function(response) {
            alert('Error getting the data');
        });
    };
});
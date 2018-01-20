var app = angular.module('DragonPong');

app.controller('MainCtrl', function($scope, $http, Matches, Ranking) {
    $scope.players = [];
    $scope.matches = [];
    $scope.ranking = [];
    $scope.exhaustionThreshold = 20;

    $scope.getOpponentsStructure = function(players, playerName) {
        var opponents = {};
        players.forEach(function(player) {
            if (player !== playerName) {
                opponents[player] = {
                    pointsFor: 0,
                    pointsAgainst: 0,
                    clashNovelty: -1,
                    clashWeight: 0
                };
            }
        });
        return opponents;
    };

    $scope.initializePlayersData = function(players) {
        var playersData = {};
        for (var index in players) {
            var playerName = players[index];
            playersData[playerName] = {
                opponents: $scope.getOpponentsStructure(players, playerName),
                name: playerName,
                score: 0,
                winning: 0,
                tying: 0,
                losing: 0,
                matchesNumber: 0,
                pointsFor: 0,
                pointsAgainst: 0,
                projection: 0,
                trend: 0,
                clashes: 0,
                expectedVariation: 0
            };
        }
        return playersData;
    };

    $scope.updatePlayerInfo = function(player, pointsFor, pointsAgainst) {
        player.matchesNumber++;
        player.pointsFor += pointsFor;
        player.pointsAgainst += pointsAgainst;
    };

    $scope.registerMatchesScores = function(matches, playersData) {
        var clashNumber = 0;
        for (var index in matches) {
            var match = matches[index];
            var playerA = playersData[match.playerA];
            var playerB = playersData[match.playerB];
            var scoreA = parseInt(match.scoreA);
            var scoreB = parseInt(match.scoreB);
            var playerAOpponent = playerA.opponents[match.playerB];
            var playerBOpponent = playerB.opponents[match.playerA];

            playerAOpponent.pointsFor += scoreA;
            playerAOpponent.pointsAgainst += scoreB;
            playerBOpponent.pointsFor += scoreB;
            playerBOpponent.pointsAgainst += scoreA;

            $scope.updatePlayerInfo(playerA, scoreA, scoreB);
            $scope.updatePlayerInfo(playerB, scoreB, scoreA);

            if (playerAOpponent.clashNovelty === -1) {
                ++clashNumber;
                playerAOpponent.clashNovelty = playerBOpponent.clashNovelty = clashNumber;
            }
        }
    };

    $scope.getPlayerInfo = function(players, playerName) {
        var targetPlayer = null;
        for (var index in players) {
            var player = players[index];
            if (player.name === playerName) {
                targetPlayer = player;
                break;
            }
        }
        return targetPlayer;
    };

    $scope.guessPendingClash = function(player, opponentName, players) {
        console.log("Guessing clash", player.name, "vs", opponentName);

        var targetPlayers = {};
        for (var playerName in players) {
            var element = players[playerName];
            if(element.name !== player.name &&
            element.name !== opponentName &&
            element.opponents[opponentName].winningRate != undefined) {
                targetPlayers[element.name] = element;
            }
        };

        var forecast = 0;
        for (var targetName in targetPlayers) {
            var targetPlayer = targetPlayers[targetName];
            if (player.opponents[targetName].winningRate > 50 &&
            targetPlayer.opponents[opponentName].winningRate > 50) {
                forecast++;
            }
            else if (player.opponents[targetName].winningRate < 50 &&
            targetPlayer.opponents[opponentName].winningRate < 50) {
                forecast--;
            }
        }
        if (forecast > 0) { 
            forecast = 1;
        }
        if (forecast < 0) { 
            forecast = -1;
        }
        return forecast;
    };

    $scope.computePlayersTrend = function(players) {
        for (var playerName in players) {
            var player = players[playerName];
            for (var opponentName in player.opponents) {
                var opponent = player.opponents[opponentName];
                if (opponent.winningRate == undefined) {                    
                    player.trend += $scope.guessPendingClash(player, opponentName, players);
                }                
            }
        }
    };

    var getCurrentPosition = function(playerName, playersScore) {
        for (var i = 0; i < playersScore.length; ++i) {
            var playerScore = playersScore[i];
            if(playerScore.name === playerName) {
                return i;
            }
        }
    };

    $scope.computeExpectedVariation = function(players) {        
        
        var playersProjection = [];
        var playersScore = [];

        for (var index in players) {
            var player = players[index];
            playersProjection.push({
                name: player.name,
                projection: player.projection,
                score: player.score
            });
            playersScore.push({
                name: player.name,
                score: player.score
            });
        }

        playersProjection.sort((a, b) => {
            if (b.projection !== a.projection) {
                return b.projection - a.projection;
            } else {
                return b.score - a.score;
            }          
        });
        playersScore.sort((a, b) => {
            return b.score - a.score;
        });

        playersProjection.forEach((playerProjection) => {
            players[playerProjection.name].expectedVariation =
            getCurrentPosition(playerProjection.name, playersScore) - 
            getCurrentPosition(playerProjection.name, playersProjection);
        });
    };

    $scope.computePlayersEfficency = function(players) {
        for (var index in players) {
            var player = players[index];
            if (player.clashes > 0) {
                for (var opponentIndex in player.opponents) {
                    var opponentData = player.opponents[opponentIndex];
                    if (opponentData.winningRate > 50) {
                        player.projection += $scope.getPlayerInfo(players, opponentIndex).winning;
                    }
                    else if (opponentData.winningRate < 50) {
                        player.projection -= $scope.getPlayerInfo(players, opponentIndex).losing;
                    }
                }
                player.projection = Math.round(player.projection * 100 / player.clashes) / 100;
            } else {
                player.projection = -Number.MAX_VALUE;
            }
        }
        $scope.computeExpectedVariation(players);
    };

    $scope.computePlayersScore = function(playersData) {
        var opponentsNumber = $scope.players.length - 1;
        for (var index in playersData) {
            var playerAData = playersData[index];
            for (var opponentIndex in playerAData.opponents) {

                var playerBData = playersData[opponentIndex];
                var playerAOpponent = playerAData.opponents[playerBData.name];
                var playerBOpponent = playerBData.opponents[playerAData.name];

                if (playerAOpponent.winningRate === undefined) {
                    var matchesStats = 
                        Ranking.computeClashScore(playerAData, playerBData, playerAOpponent, playerBOpponent, $scope.exhaustionThreshold);
                    $scope.pendingClashes = matchesStats.pendingClashes;
                    $scope.totalClashes = matchesStats.totalClashes;
                    $scope.scoredPoints += matchesStats.scoredPoints;
                }
            }
            playerAData.score = Math.round(playerAData.score);
        }
        $scope.computePlayersEfficency(playersData);
    };

    $scope.updateScores = function(players, matches) {
        $scope.sortedBy = 'score';
        $scope.sortedDir = 'desc';

        var playersData = Ranking.getPlayersData(players); 
        var matchesData = Matches.processMatches(playersData, matches);
        var ranking = Ranking.getRanking(playersData);

        $scope.scoredPoints = 0;
        var playersData = $scope.initializePlayersData(players);
        $scope.registerMatchesScores(matches, playersData);
        $scope.computePlayersScore(playersData);
        $scope.ranking = Ranking.getRanking(playersData, $scope);
    };

    $scope.sortBy = function(fieldName) {

        $scope.sortedDir = fieldName !== $scope.sortedBy || $scope.sortedDir == 'asc' ? 'desc' : 'asc';
        $scope.sortedBy = fieldName;
        var multiplier = $scope.sortedDir == 'desc' ? -1 : 1;

        $scope.ranking.sort(function(a, b) {
            return (-multiplier) * b[fieldName] + (multiplier) * a[fieldName];
        });
    };

    angular.element('body').ready(function() {        
        $http({
            method: 'GET',
            url: '/dragon-pong/matches'
        }).then(function(response) {
            $scope.players = response.data.players;
            $scope.players.sort(function(a, b) {
                return a < b ? -1 : 1;
            });
            $scope.matches = response.data.matches.reverse();
            $scope.updateScores($scope.players, $scope.matches);
        }).catch(function(response) {
            alert('Error getting the data');
        });
    });   
})
.directive('sortableHeader', function() {
    return {
        template: function(element, attr) {
            return "<div ng-click=\"sortBy('" + attr.columnName + "')\" class=\"sortable\">" + attr.displayName + " " +
            "<span class=\"blue\">" +
            "<i class=\"fa fa-question-circle\" data-toggle=\"tooltip\" title=\"" + attr.info + "\"></i> " +
            "<i class=\"fa fa-caret-up\" ng-if=\"sortedBy === '" + attr.columnName + "' && sortedDir === 'asc'\"></i>" +
            "<i class=\"fa fa-caret-down\" ng-if=\"sortedBy === '" + attr.columnName + "' && sortedDir === 'desc'\"></i></div>" +
            "</span>";
        },
        link: function(scope, element, attrs) {
            $('[data-toggle="tooltip"]').tooltip();
        }
    };
});
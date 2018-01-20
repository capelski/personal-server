var app = angular.module('DragonPong');

app.service('Matches', function() {
    
    var clashesNumber, matchesNumber, scoredPoints, pendingClashes;

    var processMatches = function(playersData, matches) {

        matchesNumber = matches.length;
        scoredPoints = 0;
        var playersNumber = Object.keys(playersData).length;
        clashesNumber = pendingClashes = playersNumber * (playersNumber - 1) / 2;

        updatePlayersData(matches, playersData);

        return {
            clashesNumber: clashesNumber,
            matchesNumber: matchesNumber,
            pendingClashes: pendingClashes,
            scoredPoints: scoredPoints
        };
    };

    var updatePlayerData = function(player, pointsFor, pointsAgainst) {
        player.matchesNumber++;
        player.pointsFor += pointsFor;
        player.pointsAgainst += pointsAgainst;
    };

    var updatePlayersData = function(matches, rankingStructure) {
        var clashNumber = 0;
        for (var index in matches) {
            var match = matches[index];
            var playerA = rankingStructure[match.playerA];
            var playerB = rankingStructure[match.playerB];
            var scoreA = parseInt(match.scoreA);
            var scoreB = parseInt(match.scoreB);
            var playerAOpponent = playerA.opponents[match.playerB];
            var playerBOpponent = playerB.opponents[match.playerA];

            playerAOpponent.pointsFor += scoreA;
            playerAOpponent.pointsAgainst += scoreB;
            playerBOpponent.pointsFor += scoreB;
            playerBOpponent.pointsAgainst += scoreA;

            updatePlayerData(playerA, scoreA, scoreB);
            updatePlayerData(playerB, scoreB, scoreA);

            if (playerAOpponent.clashNovelty === -1) {
                ++clashNumber;
                playerAOpponent.clashNovelty = playerBOpponent.clashNovelty = clashNumber;
            }
        }
    };

    return {
        processMatches: processMatches
    };
});
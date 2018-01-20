var app = angular.module('DragonPong');

app.service('Ranking', function() {

    var pendingClashes;
    var totalClashes;

    return {
        computeClashScore: computeClashScore,
        getClashWeight: getClashWeight,
        getRanking: getRanking,
        getPlayersData: getPlayersData
    };

    function getClashWeight(clashNovelty, exhaustionThreshold) {
        var clashBlock = 0;
        if (exhaustionThreshold > 0) {
            clashBlock = Math.floor(clashNovelty / exhaustionThreshold);
        }
        return 200 - clashBlock * 20;        
    };

    function computeClashScore(playerAData, playerBData, playerAOpponent, playerBOpponent, exhaustionThreshold) {
        var totalPointsFor = playerAOpponent.pointsFor;
        var totalPointsAgainst = playerAOpponent.pointsAgainst;
        var clashTotalPoints = totalPointsFor + totalPointsAgainst;

        if (clashTotalPoints > 0) {

            pendingClashes -= 0.5;

            playerAData.winning += +(totalPointsFor > totalPointsAgainst);
            playerAData.tying += +(totalPointsFor === totalPointsAgainst);
            playerAData.losing += +(totalPointsFor < totalPointsAgainst);
            playerAData.clashes++;

            playerBData.winning += +(totalPointsFor < totalPointsAgainst);
            playerBData.tying += +(totalPointsFor === totalPointsAgainst);
            playerBData.losing += +(totalPointsFor > totalPointsAgainst);
            playerBData.clashes++;

            var lowestPoints = Math.min(totalPointsFor, totalPointsAgainst);
            lowestPoints -= (lowestPoints > 0);
            totalPointsFor -= lowestPoints;
            totalPointsAgainst -= lowestPoints;
            clashTotalPoints = totalPointsFor + totalPointsAgainst;

            var winningRate = Math.round(totalPointsFor * 100 / clashTotalPoints) / 100;
            var opponentWinningRate = 1 - winningRate;

            winningRate = Math.round(winningRate * 100 /
                (winningRate + opponentWinningRate)) / 100;
            opponentWinningRate = 1 - winningRate;

            var clashWeight = getClashWeight(playerAOpponent.clashNovelty, exhaustionThreshold);
            playerAOpponent.clashWeight = clashWeight;
            playerAOpponent.winningRate = Math.round(winningRate *100);
            playerAData.score += (winningRate * clashWeight);

            playerBOpponent.clashWeight = clashWeight;
            playerBOpponent.winningRate = Math.round(opponentWinningRate * 100);
            playerBData.score += (opponentWinningRate * clashWeight);
        }

        return {
            pendingClashes: pendingClashes,
            totalClashes: totalClashes,
            scoredPoints: playerAOpponent.pointsFor + playerAOpponent.pointsAgainst
        };
    };

    function getOpponentsStructure(playerNames, playerName) {
        var opponents = {};
        playerNames.forEach(function(opponentName) {
            if (opponentName !== playerName) {
                opponents[opponentName] = {
                    pointsFor: 0,
                    pointsAgainst: 0,
                    clashNovelty: -1,
                    clashWeight: 0
                };
            }
        });
        return opponents;
    }

    function getPlayersData(playersNames) {
        totalClashes = playersNames.length * (playersNames.length - 1) / 2;
        pendingClashes = totalClashes;
        var rankingStructure = {};
        for (var index in playersNames) {
            var playerName = playersNames[index];
            rankingStructure[playerName] = {
                opponents: getOpponentsStructure(playersNames, playerName),
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
        return rankingStructure;
    };

    function updatePlayerData(player, playersData) {
        for (var opponentIndex in player.opponents) {
            var opponent = playersData[opponentIndex];
            var playerAOpponent = player.opponents[opponent.name];
            var playerBOpponent = opponent.opponents[player.name];

            if (playerAOpponent.winningRate === undefined) {
                computeClashScore(player, opponent, playerAOpponent, playerBOpponent);
            }
        }
        player.score = Math.round(player.score);
    }; 

    function getRanking(playersData) {
        var opponentsNumber = Object.keys(playersData).length - 1;
        for (var index in playersData) {
            var playerData = playersData[index];
            updatePlayerData(playerData, playersData);
        }

        var ranking = [];
        for (var index in playersData) {
            ranking.push(playersData[index]);
        }
        ranking.sort(sortingFunction);
        return ranking;
    };

    function sortingFunction(a, b) {
        if (a.score !== b.score) {
            return b.score - a.score;
        } else {
            var totalPointsA = a.pointsFor / a.pointsAgainst;
            var totalPointsB = b.pointsFor / b.pointsAgainst;
            var ratingA = totalPointsA > 0 ? a.pointsFor / totalPointsA : 0;
            var ratingB = totalPointsB > 0 ? b.pointsFor / totalPointsB : 0;
            if (ratingA !== ratingB) {
                return ratingB - ratingA;
            } else if (a.matchesNumber !== b.matchesNumber) {
                return a.matchesNumber - b.matchesNumber;
            } else {
                return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
            }
        }
    };
});
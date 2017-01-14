import ChartData from './ChartData';

export default class DataRetrieval {
    constructor(leagueDataRepo) {
        this.leagueDataRepo = leagueDataRepo;
    }

    winsChart() {
        // Iterate over this.leagueDataRepo and put together the labels and data
        var objectsArr = [];
        for (var key in this.leagueDataRepo.owners) {
            if (this.leagueDataRepo.owners.hasOwnProperty(key)) {
                objectsArr.push({
                    owner: key,
                    wins: this.leagueDataRepo.owners[key].wins
                });
            }
        }

        // Sort and build datasets
        objectsArr.sort(function(a, b) {
            return b.wins - a.wins;
        });

        var labels = [];
        var wins = [];
        for (var i = 0; i < objectsArr.length; i++) {
            labels.push(objectsArr[i].owner);
            wins.push(objectsArr[i].wins);
        }

        return new ChartData(labels, wins, '# of Wins');
    }
    lossesChart() {
        // Iterate over this.leagueDataRepo and put together the labels and data
        var objectsArr = [];
        for (var key in this.leagueDataRepo.owners) {
            if (this.leagueDataRepo.owners.hasOwnProperty(key)) {
                objectsArr.push({
                    owner: key,
                    losses: this.leagueDataRepo.owners[key].losses
                });
            }
        }

        // Sort and build datasets
        objectsArr.sort(function(a, b) {
            return b.losses - a.losses;
        });

        var labels = [];
        var losses = [];
        for (var i = 0; i < objectsArr.length; i++) {
            labels.push(objectsArr[i].owner);
            losses.push(objectsArr[i].losses);
        }

        return new ChartData(labels, losses, '# of Losses');
    }
    winPChart() {
        // Iterate over this.leagueDataRepo and put together the labels and data
        var objectsArr = [];
        for (var key in this.leagueDataRepo.owners) {
            if (this.leagueDataRepo.owners.hasOwnProperty(key)) {
                objectsArr.push({
                    owner: key,
                    winP: Math.round((this.leagueDataRepo.owners[key].wins / (this.leagueDataRepo.owners[key].wins + this.leagueDataRepo.owners[key].losses + this.leagueDataRepo.owners[key].ties) * 1000)) / 10
                });
            }
        }

        // Sort and build datasets
        objectsArr.sort(function(a, b) {
            return b.winP - a.winP;
        });

        var labels = [];
        var winP = [];
        for (var i = 0; i < objectsArr.length; i++) {
            labels.push(objectsArr[i].owner);
            winP.push(objectsArr[i].winP);
        }

        return new ChartData(labels, winP, 'Win %');
    }
    mostWinsInSeason() {
        // Iterate over this.leagueDataRepo and put together the labels and data
        var objectsArr = [];
        for (var key in this.leagueDataRepo.owners) {
            if (this.leagueDataRepo.owners.hasOwnProperty(key)) {
                objectsArr.push({
                    owner: key,
                    mostWinsInSeason: this.leagueDataRepo.owners[key].mostWinsInSeason[0].value
                });
            }
        }

        // Sort and build datasets
        objectsArr.sort(function(a, b) {
            return b.mostWinsInSeason - a.mostWinsInSeason;
        });

        var labels = [];
        var mostWinsInSeason = [];
        for (var i = 0; i < objectsArr.length; i++) {
            labels.push(objectsArr[i].owner);
            mostWinsInSeason.push(objectsArr[i].mostWinsInSeason);
        }

        return new ChartData(labels, mostWinsInSeason, 'Most Wins In Season');
    }
    mostLossesInSeason() {
        // Iterate over this.leagueDataRepo and put together the labels and data
        var objectsArr = [];
        for (var key in this.leagueDataRepo.owners) {
            if (this.leagueDataRepo.owners.hasOwnProperty(key)) {
                objectsArr.push({
                    owner: key,
                    mostLossesInSeason: this.leagueDataRepo.owners[key].mostLossesInSeason[0].value
                });
            }
        }

        // Sort and build datasets
        objectsArr.sort(function(a, b) {
            return b.mostLossesInSeason - a.mostLossesInSeason;
        });

        var labels = [];
        var mostLossesInSeason = [];
        for (var i = 0; i < objectsArr.length; i++) {
            labels.push(objectsArr[i].owner);
            mostLossesInSeason.push(objectsArr[i].mostLossesInSeason);
        }

        return new ChartData(labels, mostLossesInSeason, 'Most Losses In Season');
    }
    averageWinsInSeason() {
        // Iterate over this.leagueDataRepo and put together the labels and data
        var objectsArr = [];
        for (var key in this.leagueDataRepo.owners) {
            if (this.leagueDataRepo.owners.hasOwnProperty(key)) {
                objectsArr.push({
                    owner: key,
                    averageWinsInSeason: Math.round((this.leagueDataRepo.owners[key].wins / Object.keys(this.leagueDataRepo.owners[key].seasons).length) * 100) / 100
                });
            }
        }

        // Sort and build datasets
        objectsArr.sort(function(a, b) {
            return b.averageWinsInSeason - a.averageWinsInSeason;
        });

        var labels = [];
        var averageWinsInSeason = [];
        for (var i = 0; i < objectsArr.length; i++) {
            labels.push(objectsArr[i].owner);
            averageWinsInSeason.push(objectsArr[i].averageWinsInSeason);
        }

        return new ChartData(labels, averageWinsInSeason, 'Average Wins In Season');
    }
    totalPointsFor() {
        // Iterate over this.leagueDataRepo and put together the labels and data
        var objectsArr = [];
        for (var key in this.leagueDataRepo.owners) {
            if (this.leagueDataRepo.owners.hasOwnProperty(key)) {
                objectsArr.push({
                    owner: key,
                    pointsFor: Math.round(this.leagueDataRepo.owners[key].pointsFor * 100) / 100
                });
            }
        }

        // Sort and build datasets
        objectsArr.sort(function(a, b) {
            return b.pointsFor - a.pointsFor;
        });

        var labels = [];
        var pointsFor = [];
        for (var i = 0; i < objectsArr.length; i++) {
            labels.push(objectsArr[i].owner);
            pointsFor.push(objectsArr[i].pointsFor);
        }

        return new ChartData(labels, pointsFor, 'Total # of Points For');
    }
    totalPointsAgainst() {
        // Iterate over this.leagueDataRepo and put together the labels and data
        var objectsArr = [];
        for (var key in this.leagueDataRepo.owners) {
            if (this.leagueDataRepo.owners.hasOwnProperty(key)) {
                objectsArr.push({
                    owner: key,
                    pointsAgainst: Math.round(this.leagueDataRepo.owners[key].pointsAgainst * 100) / 100
                });
            }
        }

        // Sort and build datasets
        objectsArr.sort(function(a, b) {
            return b.pointsAgainst - a.pointsAgainst;
        });

        var labels = [];
        var pointsAgainst = [];
        for (var i = 0; i < objectsArr.length; i++) {
            labels.push(objectsArr[i].owner);
            pointsAgainst.push(objectsArr[i].pointsAgainst);
        }

        return new ChartData(labels, pointsAgainst, 'Total # of Points Against');
    }
    averagePointsFor() {
        // Iterate over this.leagueDataRepo and put together the labels and data
        var objectsArr = [];
        for (var key in this.leagueDataRepo.owners) {
            if (this.leagueDataRepo.owners.hasOwnProperty(key)) {
                objectsArr.push({
                    owner: key,
                    averagePointsFor: Math.round((this.leagueDataRepo.owners[key].pointsFor / Object.keys(this.leagueDataRepo.owners[key].seasons).length) * 100) / 100
                });
            }
        }

        // Sort and build datasets
        objectsArr.sort(function(a, b) {
            return b.averagePointsFor - a.averagePointsFor;
        });

        var labels = [];
        var averagePointsFor = [];
        for (var i = 0; i < objectsArr.length; i++) {
            labels.push(objectsArr[i].owner);
            averagePointsFor.push(objectsArr[i].averagePointsFor);
        }

        return new ChartData(labels, averagePointsFor, 'Average # of Points For');
    }
    averagePointsAgainst() {
        // Iterate over this.leagueDataRepo and put together the labels and data
        var objectsArr = [];
        for (var key in this.leagueDataRepo.owners) {
            if (this.leagueDataRepo.owners.hasOwnProperty(key)) {
                objectsArr.push({
                    owner: key,
                    averagepointsAgainst: Math.round((this.leagueDataRepo.owners[key].pointsAgainst / Object.keys(this.leagueDataRepo.owners[key].seasons).length) * 100) / 100
                });
            }
        }

        // Sort and build datasets
        objectsArr.sort(function(a, b) {
            return b.averagepointsAgainst - a.averagepointsAgainst;
        });

        var labels = [];
        var averagepointsAgainst = [];
        for (var i = 0; i < objectsArr.length; i++) {
            labels.push(objectsArr[i].owner);
            averagepointsAgainst.push(objectsArr[i].averagepointsAgainst);
        }

        return new ChartData(labels, averagepointsAgainst, 'Average # of Points Against');
    }
    ownerHighestGameScore() {
        // Iterate over this.leagueDataRepo and put together the labels and data
        var objectsArr = [];
        for (var key in this.leagueDataRepo.owners) {
            if (this.leagueDataRepo.owners.hasOwnProperty(key)) {
                objectsArr.push({
                    owner: key,
                    ownerHighestGameScore: this.leagueDataRepo.owners[key].mostPointsForInGame[0].value
                });
            }
        }

        // Sort and build datasets
        objectsArr.sort(function(a, b) {
            return b.ownerHighestGameScore - a.ownerHighestGameScore;
        });

        var labels = [];
        var ownerHighestGameScore = [];
        for (var i = 0; i < objectsArr.length; i++) {
            labels.push(objectsArr[i].owner);
            ownerHighestGameScore.push(objectsArr[i].ownerHighestGameScore);
        }

        return new ChartData(labels, ownerHighestGameScore, 'Highest Game Score Per Owner');
    }
    ownerLowestGameScore() {
        // Iterate over this.leagueDataRepo and put together the labels and data
        var objectsArr = [];
        for (var key in this.leagueDataRepo.owners) {
            if (this.leagueDataRepo.owners.hasOwnProperty(key)) {
                objectsArr.push({
                    owner: key,
                    ownerLowestGameScore: this.leagueDataRepo.owners[key].leastPointsForInGame[0].value
                });
            }
        }

        // Sort and build datasets
        objectsArr.sort(function(a, b) {
            return a.ownerLowestGameScore - b.ownerLowestGameScore;
        });

        var labels = [];
        var ownerLowestGameScore = [];
        for (var i = 0; i < objectsArr.length; i++) {
            labels.push(objectsArr[i].owner);
            ownerLowestGameScore.push(objectsArr[i].ownerLowestGameScore);
        }

        return new ChartData(labels, ownerLowestGameScore, 'Lowest Game Score Per Owner');
    }
    ownerMostSeasonPointsFor() {
        // Iterate over this.leagueDataRepo and put together the labels and data
        var objectsArr = [];
        for (var key in this.leagueDataRepo.owners) {
            if (this.leagueDataRepo.owners.hasOwnProperty(key)) {
                objectsArr.push({
                    owner: key,
                    ownerMostSeasonPointsFor: Math.round(this.leagueDataRepo.owners[key].mostPointsForInSeason[0].value * 100) / 100
                });
            }
        }

        // Sort and build datasets
        objectsArr.sort(function(a, b) {
            return b.ownerMostSeasonPointsFor - a.ownerMostSeasonPointsFor;
        });

        var labels = [];
        var ownerMostSeasonPointsFor = [];
        for (var i = 0; i < objectsArr.length; i++) {
            labels.push(objectsArr[i].owner);
            ownerMostSeasonPointsFor.push(objectsArr[i].ownerMostSeasonPointsFor);
        }

        return new ChartData(labels, ownerMostSeasonPointsFor, 'Most Points For In a Season By Owner');
    }
    ownerMinSeasonPointsFor() {
        // Iterate over this.leagueDataRepo and put together the labels and data
        var objectsArr = [];
        for (var key in this.leagueDataRepo.owners) {
            if (this.leagueDataRepo.owners.hasOwnProperty(key)) {
                objectsArr.push({
                    owner: key,
                    ownerLeastSeasonPointsFor: Math.round(this.leagueDataRepo.owners[key].leastPointsForInSeason[0].value * 100) / 100
                });
            }
        }

        // Sort and build datasets
        objectsArr.sort(function(a, b) {
            return a.ownerLeastSeasonPointsFor - b.ownerLeastSeasonPointsFor;
        });

        var labels = [];
        var ownerLeastSeasonPointsFor = [];
        for (var i = 0; i < objectsArr.length; i++) {
            labels.push(objectsArr[i].owner);
            ownerLeastSeasonPointsFor.push(objectsArr[i].ownerLeastSeasonPointsFor);
        }

        return new ChartData(labels, ownerLeastSeasonPointsFor, 'Least Points For In a Season By Owner');
    }
    ownerAverageGameScore() {
        // Iterate over this.leagueDataRepo and put together the labels and data
        var objectsArr = [];
        for (var key in this.leagueDataRepo.owners) {
            if (this.leagueDataRepo.owners.hasOwnProperty(key)) {
                let totalGamesPlayed = this.leagueDataRepo.owners[key].wins + this.leagueDataRepo.owners[key].losses + this.leagueDataRepo.owners[key].ties;
                objectsArr.push({
                    owner: key,
                    ownerAverageGameScore: Math.round((this.leagueDataRepo.owners[key].pointsFor / totalGamesPlayed) * 100) / 100
                });
            }
        }

        // Sort and build datasets
        objectsArr.sort(function(a, b) {
            return b.ownerAverageGameScore - a.ownerAverageGameScore;
        });

        var labels = [];
        var ownerAverageGameScore = [];
        for (var i = 0; i < objectsArr.length; i++) {
            labels.push(objectsArr[i].owner);
            ownerAverageGameScore.push(objectsArr[i].ownerAverageGameScore);
        }

        return new ChartData(labels, ownerAverageGameScore, 'Average Game Score');
    }
    championships() {
        var objectsArr = [];
        var championshipsData = {};
        for (var season in this.leagueDataRepo.seasons) {
            if (this.leagueDataRepo.seasons.hasOwnProperty(season)) {
                const champion = this.leagueDataRepo.seasons[season].championName;

                if (championshipsData[champion]) {
                    // Previous champion
                    championshipsData[champion] = championshipsData[champion] + 1;
                } else {
                    // First win
                    championshipsData[champion] = 1;
                }
            }
        }

        // Populate objectArr that we'll use to sort the results
        for (var champion in championshipsData) {
            if (championshipsData.hasOwnProperty(champion)) {
                objectsArr.push({
                    owner: champion,
                    championships: championshipsData[champion]
                });
            }
        }

        // Sort and build datasets
        objectsArr.sort(function(a, b) {
            return b.championships - a.championships;
        });

        let labels = [];
        let championships = [];
        for (var i = 0; i < objectsArr.length; i++) {
            labels.push(objectsArr[i].owner);
            championships.push(objectsArr[i].championships);
        }

        return new ChartData(labels, championships, 'Championships');
    }
    runnerUps() {
        let objectsArr = [];
        let runnerUpsData = {};
        for (let season in this.leagueDataRepo.seasons) {
            if (this.leagueDataRepo.seasons.hasOwnProperty(season)) {
                const runnerUp = this.leagueDataRepo.seasons[season].runnerUpName;

                if (runnerUpsData[runnerUp]) {
                    // Previous champion
                    runnerUpsData[runnerUp] = runnerUpsData[runnerUp] + 1;
                } else {
                    // First win
                    runnerUpsData[runnerUp] = 1;
                }
            }
        }

        // Populate objectArr that we'll use to sort the results
        for (let key in runnerUpsData) {
            if (runnerUpsData.hasOwnProperty(key)) {
                objectsArr.push({
                    owner: key,
                    runnerUps: runnerUpsData[key]
                });
            }
        }

        // Sort and build datasets
        objectsArr.sort(function(a, b) {
            return b.runnerUps - a.runnerUps;
        });

        let labels = [];
        let runnerUps = [];
        for (let i = 0; i < objectsArr.length; i++) {
            labels.push(objectsArr[i].owner);
            runnerUps.push(objectsArr[i].runnerUps);
        }

        return new ChartData(labels, runnerUps, 'Runner Ups');
    }
    totalLeaguePoints() {
        let totalPoints = 0;

        for (let season in this.leagueDataRepo.seasons) {
            if (this.leagueDataRepo.seasons.hasOwnProperty(season)) {
                const points = this.leagueDataRepo.seasons[season].totalPoints;
                totalPoints += points;
            }
        }

        return totalPoints;
    }
    leaguePointsByYear() {
        let labels = [];
        let points = [];
        for (let season in this.leagueDataRepo.seasons) {
            if (this.leagueDataRepo.seasons.hasOwnProperty(season)) {
                labels.push(season);
                points.push(this.leagueDataRepo.seasons[season].totalPoints);
            }
        }

        return new ChartData(labels, points, 'Total League Points by Season');
    }

    generateAndStoreData(data) {
        data.winsChart = this.winsChart();
        data.lossesChart = this.lossesChart();
        data.winPChart = this.winPChart();
        data.mostWinsInSeason = this.mostWinsInSeason();
        data.mostLossesInSeason = this.mostLossesInSeason();
        data.averageWinsInSeason = this.averageWinsInSeason();
        data.totalPointFor = this.totalPointsFor();
        data.totalPointsAgainst = this.totalPointsAgainst();
        data.averagePointsFor = this.averagePointsFor();
        data.averagePointsAgainst = this.averagePointsAgainst();
        data.ownerHighestGameScore = this.ownerHighestGameScore();
        data.ownerLowestGameScore = this.ownerLowestGameScore();
        data.ownerAverageGameScore = this.ownerAverageGameScore();
        data.ownerMostSeasonPointsFor = this.ownerMostSeasonPointsFor();
        data.ownerMinSeasonPointsFor = this.ownerMinSeasonPointsFor();
        data.championships = this.championships();
        data.runnerUps = this.runnerUps();
        data.totalLeaguePoints = this.totalLeaguePoints();
        data.leaguePointsByYear = this.leaguePointsByYear();
    }
}
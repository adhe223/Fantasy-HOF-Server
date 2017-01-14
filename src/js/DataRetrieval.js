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

    generateAndStoreData(data) {
        const winsChart = this.winsChart();
        data.winsChart = winsChart;
        const lossesChart = this.lossesChart();
        data.lossesChart = lossesChart;
        const winPChart = this.winPChart();
        data.winPChart = winPChart;
        const mostWinsInSeason = this.mostWinsInSeason();
        data.mostWinsInSeason = mostWinsInSeason;
        const mostLossesInSeason = this.mostLossesInSeason();
        data.mostLossesInSeason = mostLossesInSeason;
        const averageWinsInSeason = this.averageWinsInSeason();
        data.averageWinsInSeason = averageWinsInSeason;
        const totalPointFor = this.totalPointsFor();
        data.totalPointFor = totalPointFor;
        const totalPointsAgainst = this.totalPointsAgainst();
        data.totalPointsAgainst = totalPointsAgainst;
        const averagePointsFor = this.averagePointsFor();
        data.averagePointsFor = averagePointsFor;
        const averagePointsAgainst = this.averagePointsAgainst();
        data.averagePointsAgainst = averagePointsAgainst;
        const ownerHighestGameScore = this.ownerHighestGameScore();
        data.ownerHighestGameScore = ownerHighestGameScore;
        const ownerLowestGameScore = this.ownerLowestGameScore();
        data.ownerLowestGameScore = ownerLowestGameScore;
        const ownerAverageGameScore = this.ownerAverageGameScore();
        data.ownerAverageGameScore = ownerAverageGameScore;
        const ownerMostSeasonPointsFor = this.ownerMostSeasonPointsFor();
        data.ownerMostSeasonPointsFor = ownerMostSeasonPointsFor;
        const ownerMinSeasonPointsFor = this.ownerMinSeasonPointsFor();
        data.ownerMinSeasonPointsFor = ownerMinSeasonPointsFor;
    }
}
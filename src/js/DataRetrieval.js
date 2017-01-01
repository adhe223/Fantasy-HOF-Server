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
}
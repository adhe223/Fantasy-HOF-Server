import React from 'react';
import Chart from 'chart.js';

class BarChart extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const chartName = this.props.chartName;

        // Iterate over leagueData and put together the labels and data
        var objectsArr = [];
        for (var key in leagueData.owners) {
            if (leagueData.owners.hasOwnProperty(key)) {
                objectsArr.push({
                    owner: key,
                    wins: leagueData.owners[key].wins
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

        const chartData = {
            labels: labels,
            datasets: [{
                label: '# of Wins',
                data: wins,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1
            }]
        };
        const options ={
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        };

        var ctx = document.getElementById("{chartName}");
        var myBarChart = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: options
        });
    }

    render() {
        return (
            <canvas id="{chartName}" width="400" height="400"></canvas>
        );
    }
}

export default BarChart;
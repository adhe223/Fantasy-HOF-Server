import React from 'react';
import Chart from 'chart.js';

class LossChart extends React.Component {
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
                    losses: leagueData.owners[key].losses
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

        const chartData = {
            labels: labels,
            datasets: [{
                label: '# of Losses',
                data: losses,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255,99,132,1)',
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

        var ctx = document.getElementById(chartName);
        var myBarChart = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: options
        });
    }

    render() {
        return (
            <canvas id={this.props.chartName} width="400" height="400"></canvas>
        );
    }
}

export default LossChart;
import React from 'react';
import Chart from 'chart.js';

class BarChart extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const chartName = this.props.chartName;
        const chartLabels = this.props.chartLabels;
        const chartDataSet = this.props.chartDataset;
        const chartDatasetLabel = this.props.chartDatasetLabel;
        const chartData = {
            labels: chartLabels,
            datasets: [{
                label: chartDatasetLabel,
                data: chartDataSet,
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

export default BarChart;
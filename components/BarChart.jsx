import React from 'react';
import Chart from 'chart.js';

class BarChart extends React.Component {
    constructor(props) {
        super(props);

        this.chartData = null;
        this.options = null;

        const chartLabels = this.props.chartLabels;
        const chartDataSet = this.props.chartDataset;
        const chartDatasetLabel = this.props.chartDatasetLabel;
        this.chartData = {
            labels: chartLabels,
            datasets: [{
                label: chartDatasetLabel,
                data: chartDataSet,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1
            }]
        };
        this.options ={
            responsive: false,
            maintainAspectRatio: true,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        };
    }

    componentDidMount() {
        var ctx = document.getElementById(this.props.chartName);
        this.myBarChart = new Chart(ctx, {
            type: 'bar',
            data: this.chartData,
            options: this.options
        });
    }

    componentWillUnmount() {
        this.myBarChart.destroy();
    }

    render() {
        return (
            <canvas id={this.props.chartName} width={this.props.chartWidth * 0.8} height={500} />
        );
    }
}

export default BarChart;
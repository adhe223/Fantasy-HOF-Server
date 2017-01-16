import React from 'react';
import Chart from 'chart.js';
import css from './styles/barchart.css';

class BarChart extends React.Component {
    constructor(props) {
        super(props);
        this.chartName = this.props.chartName;
        this.chartWidth = this.props.chartWidth;
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
            title: {
                display: true,
                text: chartDatasetLabel,
                fontSize: 32,
                fontFamily: "'Tahoma', 'Geneva', 'sans-serif'",
                fontStyle: 'bold',
                padding: 12
            },
            legend: {
                display: false
            },
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
        var ctx = document.getElementById(this.chartName);
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
            <canvas className="bar-chart" id={this.chartName} width={this.chartWidth * 0.9} height={600} />
        );
    }
}

export default BarChart;
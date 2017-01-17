import React from 'react';
import ChartJS from 'chart.js';
import css from './styles/chart.css';

ChartJS.defaults.global.defaultFontSize = 16;

class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.chartName = this.props.chartName;
        this.chartWidth = this.props.chartWidth;
        this.chartType = this.props.chartType;
        const chartLabels = this.props.chartLabels;
        const chartDataSet = this.props.chartDataset;
        const chartDatasetLabel = this.props.chartDatasetLabel;
        let backgroundColor = this.props.backgroundColor;
        let borderColor = this.props.borderColor;
        if (!backgroundColor) {
            backgroundColor = 'rgba(255, 99, 132, 0.2)';
        }
        if (!borderColor) {
            borderColor = 'rgba(255,99,132,1)';
        }

        let yAxes = true;
        let legend = false;
        if (this.chartType === "doughnut" || this.chartType === "pie") {
            // Disable scales for charts it doesn't make sense on
            yAxes = false;

            // Enable the legend
            legend = true;
        }

        this.chartData = {
            labels: chartLabels,
            datasets: [{
                label: chartDatasetLabel,
                data: chartDataSet,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
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
                display: legend,
                position: 'left'
            },
            scales: {
                yAxes: [{
                    display: yAxes,
                    ticks: {
                        beginAtZero:true
                    }
                }],
                xAxes: [{
                    ticks: {
                        autoSkip: false
                    }
                }]
            }
        };
    }

    componentDidMount() {
        let ctx = document.getElementById(this.chartName);
        this.myChart = new ChartJS(ctx, {
            type: this.chartType,
            data: this.chartData,
            options: this.options
        });
    }

    componentWillUnmount() {
        this.myChart.destroy();
    }

    render() {
        return (
            <canvas className="chart" id={this.chartName} width={this.chartWidth * 0.9} height={600} />
        );
    }
}

export default Chart;
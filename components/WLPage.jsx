import React from 'react';
import BarChart from './BarChart';

class WLPage extends React.Component {
    constructor(props) {
        super(props);

        this.charts = this.props.charts;
        this.chartWidth = this.props.chartWidth;
    }

    render() {
        return(
            <div>
            <BarChart chartName="winsChart" chartLabels={this.charts.winsChart.labels} chartDataset={this.charts.winsChart.dataset} chartDatasetLabel={this.charts.winsChart.datasetLabel} chartWidth={this.chartWidth}/>
            <BarChart chartName="lossesChart" chartLabels={this.charts.lossesChart.labels} chartDataset={this.charts.lossesChart.dataset} chartDatasetLabel={this.charts.lossesChart.datasetLabel} chartWidth={this.chartWidth}/>
            <BarChart chartName="winPChart" chartLabels={this.charts.winPChart.labels} chartDataset={this.charts.winPChart.dataset} chartDatasetLabel={this.charts.winPChart.datasetLabel} chartWidth={this.chartWidth}/>
            <BarChart chartName="mostWinsInSeason" chartLabels={this.charts.mostWinsInSeason.labels} chartDataset={this.charts.mostWinsInSeason.dataset} chartDatasetLabel={this.charts.mostWinsInSeason.datasetLabel} chartWidth={this.chartWidth}/>
            <BarChart chartName="mostLossesInSeason" chartLabels={this.charts.mostLossesInSeason.labels} chartDataset={this.charts.mostLossesInSeason.dataset} chartDatasetLabel={this.charts.mostLossesInSeason.datasetLabel} chartWidth={this.chartWidth}/>
            <BarChart chartName="averageWinsInSeason" chartLabels={this.charts.averageWinsInSeason.labels} chartDataset={this.charts.averageWinsInSeason.dataset} chartDatasetLabel={this.charts.averageWinsInSeason.datasetLabel} chartWidth={this.chartWidth}/>
            </div>
        );
    }
}

export default WLPage;
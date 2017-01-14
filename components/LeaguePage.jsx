import React from 'react';
import BarChart from './BarChart';

class LeaguePage extends React.Component {
    constructor(props) {
        super(props);

        this.charts = this.props.charts;
        this.chartWidth = this.props.chartWidth;
    }

    render() {

        return(
            <div>
            <BarChart chartName="championships" chartLabels={this.charts.championships.labels} chartDataset={this.charts.championships.dataset} chartDatasetLabel={this.charts.championships.datasetLabel} chartWidth={this.chartWidth}/>
            <BarChart chartName="runnerUps" chartLabels={this.charts.runnerUps.labels} chartDataset={this.charts.runnerUps.dataset} chartDatasetLabel={this.charts.runnerUps.datasetLabel} chartWidth={this.chartWidth}/>
            <BarChart chartName="leaguePointsByYear" chartLabels={this.charts.leaguePointsByYear.labels} chartDataset={this.charts.leaguePointsByYear.dataset} chartDatasetLabel={this.charts.leaguePointsByYear.datasetLabel} chartWidth={this.chartWidth}/>
            </div>
        );
    }
}

export default LeaguePage;
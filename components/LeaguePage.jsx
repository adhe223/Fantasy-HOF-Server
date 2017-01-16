import React from 'react';
import Chart from './Chart';

class LeaguePage extends React.Component {
    constructor(props) {
        super(props);

        this.charts = this.props.charts;
        this.chartWidth = this.props.chartWidth;
    }

    render() {

        return(
            <div>
                <Chart chartType="bar" chartName="championships" chartLabels={this.charts.championships.labels} chartDataset={this.charts.championships.dataset} chartDatasetLabel={this.charts.championships.datasetLabel} chartWidth={this.chartWidth}/>
                <Chart chartType="bar" chartName="runnerUps" chartLabels={this.charts.runnerUps.labels} chartDataset={this.charts.runnerUps.dataset} chartDatasetLabel={this.charts.runnerUps.datasetLabel} chartWidth={this.chartWidth}/>
                <Chart chartType="line" chartName="leaguePointsByYear" chartLabels={this.charts.leaguePointsByYear.labels} chartDataset={this.charts.leaguePointsByYear.dataset} chartDatasetLabel={this.charts.leaguePointsByYear.datasetLabel} chartWidth={this.chartWidth}/>
                <ul>
                    <li key="totalLeaguePoints">Total League Points: {this.charts.totalLeaguePoints}</li>
                </ul>
            </div>
        );
    }
}

export default LeaguePage;
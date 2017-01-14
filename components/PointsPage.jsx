import React from 'react';
import BarChart from './BarChart';

class PointsPage extends React.Component {
    constructor(props) {
        super(props);

        this.charts = this.props.charts;
        this.chartWidth = this.props.chartWidth;
    }
    
    render() {
        return(
            <div>
            <BarChart chartName="totalPointsFor" chartLabels={this.charts.totalPointFor.labels} chartDataset={this.charts.totalPointFor.dataset} chartDatasetLabel={this.charts.totalPointFor.datasetLabel} chartWidth={this.chartWidth}/>
            <BarChart chartName="totalPointsAgainst" chartLabels={this.charts.totalPointsAgainst.labels} chartDataset={this.charts.totalPointsAgainst.dataset} chartDatasetLabel={this.charts.totalPointsAgainst.datasetLabel} chartWidth={this.chartWidth}/>
            <BarChart chartName="averagePointsFor" chartLabels={this.charts.averagePointsFor.labels} chartDataset={this.charts.averagePointsFor.dataset} chartDatasetLabel={this.charts.averagePointsFor.datasetLabel} chartWidth={this.chartWidth}/>
            <BarChart chartName="averagePointsAgainst" chartLabels={this.charts.averagePointsAgainst.labels} chartDataset={this.charts.averagePointsAgainst.dataset} chartDatasetLabel={this.charts.averagePointsAgainst.datasetLabel} chartWidth={this.chartWidth}/>
            <BarChart chartName="ownerHighestGameScore" chartLabels={this.charts.ownerHighestGameScore.labels} chartDataset={this.charts.ownerHighestGameScore.dataset} chartDatasetLabel={this.charts.ownerHighestGameScore.datasetLabel} chartWidth={this.chartWidth}/>
            <BarChart chartName="ownerLowestGameScore" chartLabels={this.charts.ownerLowestGameScore.labels} chartDataset={this.charts.ownerLowestGameScore.dataset} chartDatasetLabel={this.charts.ownerLowestGameScore.datasetLabel} chartWidth={this.chartWidth}/>
            <BarChart chartName="ownerAverageGameScore" chartLabels={this.charts.ownerAverageGameScore.labels} chartDataset={this.charts.ownerAverageGameScore.dataset} chartDatasetLabel={this.charts.ownerAverageGameScore.datasetLabel} chartWidth={this.chartWidth}/>
            <BarChart chartName="ownerMostSeasonPointsFor" chartLabels={this.charts.ownerMostSeasonPointsFor.labels} chartDataset={this.charts.ownerMostSeasonPointsFor.dataset} chartDatasetLabel={this.charts.ownerMostSeasonPointsFor.datasetLabel} chartWidth={this.chartWidth}/>
            <BarChart chartName="ownerMinSeasonPointsFor" chartLabels={this.charts.ownerMinSeasonPointsFor.labels} chartDataset={this.charts.ownerMinSeasonPointsFor.dataset} chartDatasetLabel={this.charts.ownerMinSeasonPointsFor.datasetLabel} chartWidth={this.chartWidth}/>
            </div>
        );
    }
}

export default PointsPage;
import React from 'react';
import ReactDOM from 'react-dom';
import BarChart from './BarChart';
import MatchupPage from './MatchupPage';
import MenuBar from './MenuBar';
import DataRetrieval from '../src/js/DataRetrieval';
import ChartData from '../src/js/ChartData';

var retriever = new DataRetrieval(leagueData);
var charts = {};

retriever.generateAndStoreData(charts);

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: ['Graphs', 'Matchups'],
            page: "Graphs"
        };
        this.cachedBarCharts = null;
        this.cachedMatchups = null;

        this.updateApp = this.updateApp.bind(this);
        this.renderBarCharts = this.renderBarCharts.bind(this);
        this.renderMatchups = this.renderMatchups.bind(this);
    }

    // Pass this to the child menu bar component. When a button is pressed the child calls this method to update
    updateApp(page) {
        this.setState({page: page});
    }

    renderBarCharts() {
        if (this.cachedBarCharts) {
            return this.cachedBarCharts;
        }

        const barCharts =
            <div>
            <BarChart chartName="winsChart" chartLabels={this.props.charts.winsChart.labels} chartDataset={this.props.charts.winsChart.dataset} chartDatasetLabel={this.props.charts.winsChart.datasetLabel}/> <BarChart chartName="lossesChart" chartLabels={this.props.charts.lossesChart.labels} chartDataset={this.props.charts.lossesChart.dataset} chartDatasetLabel={this.props.charts.lossesChart.datasetLabel} />
            <BarChart chartName="winPChart" chartLabels={this.props.charts.winPChart.labels} chartDataset={this.props.charts.winPChart.dataset} chartDatasetLabel={this.props.charts.winPChart.datasetLabel} />
            <BarChart chartName="mostWinsInSeason" chartLabels={this.props.charts.mostWinsInSeason.labels} chartDataset={this.props.charts.mostWinsInSeason.dataset} chartDatasetLabel={this.props.charts.mostWinsInSeason.datasetLabel} />
            <BarChart chartName="mostLossesInSeason" chartLabels={this.props.charts.mostLossesInSeason.labels} chartDataset={this.props.charts.mostLossesInSeason.dataset} chartDatasetLabel={this.props.charts.mostLossesInSeason.datasetLabel} />
            <BarChart chartName="averageWinsInSeason" chartLabels={this.props.charts.averageWinsInSeason.labels} chartDataset={this.props.charts.averageWinsInSeason.dataset} chartDatasetLabel={this.props.charts.averageWinsInSeason.datasetLabel} />
            <BarChart chartName="totalPointsFor" chartLabels={this.props.charts.totalPointFor.labels} chartDataset={this.props.charts.totalPointFor.dataset} chartDatasetLabel={this.props.charts.totalPointFor.datasetLabel} />
            <BarChart chartName="totalPointsAgainst" chartLabels={this.props.charts.totalPointsAgainst.labels} chartDataset={this.props.charts.totalPointsAgainst.dataset} chartDatasetLabel={this.props.charts.totalPointsAgainst.datasetLabel} />
            <BarChart chartName="averagePointsFor" chartLabels={this.props.charts.averagePointsFor.labels} chartDataset={this.props.charts.averagePointsFor.dataset} chartDatasetLabel={this.props.charts.averagePointsFor.datasetLabel} />
            <BarChart chartName="averagePointsAgainst" chartLabels={this.props.charts.averagePointsAgainst.labels} chartDataset={this.props.charts.averagePointsAgainst.dataset} chartDatasetLabel={this.props.charts.averagePointsAgainst.datasetLabel} />
            <BarChart chartName="ownerHighestGameScore" chartLabels={this.props.charts.ownerHighestGameScore.labels} chartDataset={this.props.charts.ownerHighestGameScore.dataset} chartDatasetLabel={this.props.charts.ownerHighestGameScore.datasetLabel} />
            <BarChart chartName="ownerLowestGameScore" chartLabels={this.props.charts.ownerLowestGameScore.labels} chartDataset={this.props.charts.ownerLowestGameScore.dataset} chartDatasetLabel={this.props.charts.ownerLowestGameScore.datasetLabel} />
            <BarChart chartName="ownerAverageGameScore" chartLabels={this.props.charts.ownerAverageGameScore.labels} chartDataset={this.props.charts.ownerAverageGameScore.dataset} chartDatasetLabel={this.props.charts.ownerAverageGameScore.datasetLabel} />
            <BarChart chartName="ownerMostSeasonPointsFor" chartLabels={this.props.charts.ownerMostSeasonPointsFor.labels} chartDataset={this.props.charts.ownerMostSeasonPointsFor.dataset} chartDatasetLabel={this.props.charts.ownerMostSeasonPointsFor.datasetLabel} />
            <BarChart chartName="ownerMinSeasonPointsFor" chartLabels={this.props.charts.ownerMinSeasonPointsFor.labels} chartDataset={this.props.charts.ownerMinSeasonPointsFor.dataset} chartDatasetLabel={this.props.charts.ownerMinSeasonPointsFor.datasetLabel} />
            </div>;

        this.cachedBarCharts = barCharts;
        return barCharts;
    }

    renderMatchups() {
        if (this.cachedMatchups) {
            return this.cachedMatchups;
        }

        const matchups =
            <div>
            <MatchupPage owners={ this.props.owners } />
            </div>;

        this.cachedMatchups = matchups;
        return matchups;
    }

    render() {
        let content = null;
        if (this.state.page === "Graphs") {
            content = this.renderBarCharts();
        } else if (this.state.page === "Matchups") {
            content = this.renderMatchups();
        }

        return(
            <div>
                <div>
                    <MenuBar value={ this.state.page } pages={ this.state.pages } updateMethod={ this.updateApp } />
                </div>
                <div>
                    { content }
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App owners={ leagueData.owners } charts={ charts }/>,
    document.getElementById("root")
);
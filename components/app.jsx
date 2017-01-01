import React from 'react';
import ReactDOM from 'react-dom';
import BarChart from './BarChart';
import DataRetrieval from '../src/js/DataRetrieval';
import ChartData from '../src/js/ChartData';

var retriever = new DataRetrieval(leagueData);
const winsChart = retriever.winsChart();
const lossesChart = retriever.lossesChart();
const winPChart = retriever.winPChart();
const mostWinsInSeason = retriever.mostWinsInSeason();
const mostLossesInSeason = retriever.mostLossesInSeason();
const averageWinsInSeason = retriever.averageWinsInSeason();
const totalPointFor = retriever.totalPointsFor();
const totalPointsAgainst = retriever.totalPointsAgainst();
const averagePointsFor = retriever.averagePointsFor();
const averagePointsAgainst = retriever.averagePointsAgainst();
const ownerHighestGameScore = retriever.ownerHighestGameScore();
const ownerLowestGameScore = retriever.ownerLowestGameScore();
const ownerAverageGameScore = retriever.ownerAverageGameScore();
const ownerMostSeasonPointsFor = retriever.ownerMostSeasonPointsFor();
const ownerMinSeasonPointsFor = retriever.ownerMinSeasonPointsFor();

ReactDOM.render(
    <div>
        <BarChart chartName="winsChart" chartLabels={winsChart.labels} chartDataset={winsChart.dataset} chartDatasetLabel={winsChart.datasetLabel} />
        <BarChart chartName="lossesChart" chartLabels={lossesChart.labels} chartDataset={lossesChart.dataset} chartDatasetLabel={lossesChart.datasetLabel} />
        <BarChart chartName="winPChart" chartLabels={winPChart.labels} chartDataset={winPChart.dataset} chartDatasetLabel={winPChart.datasetLabel} />
        <BarChart chartName="mostWinsInSeason" chartLabels={mostWinsInSeason.labels} chartDataset={mostWinsInSeason.dataset} chartDatasetLabel={mostWinsInSeason.datasetLabel} />
        <BarChart chartName="mostLossesInSeason" chartLabels={mostLossesInSeason.labels} chartDataset={mostLossesInSeason.dataset} chartDatasetLabel={mostLossesInSeason.datasetLabel} />
        <BarChart chartName="averageWinsInSeason" chartLabels={averageWinsInSeason.labels} chartDataset={averageWinsInSeason.dataset} chartDatasetLabel={averageWinsInSeason.datasetLabel} />
        <BarChart chartName="totalPointsFor" chartLabels={totalPointFor.labels} chartDataset={totalPointFor.dataset} chartDatasetLabel={totalPointFor.datasetLabel} />
        <BarChart chartName="totalPointsAgainst" chartLabels={totalPointsAgainst.labels} chartDataset={totalPointsAgainst.dataset} chartDatasetLabel={totalPointsAgainst.datasetLabel} />
        <BarChart chartName="averagePointsFor" chartLabels={averagePointsFor.labels} chartDataset={averagePointsFor.dataset} chartDatasetLabel={averagePointsFor.datasetLabel} />
        <BarChart chartName="averagePointsAgainst" chartLabels={averagePointsAgainst.labels} chartDataset={averagePointsAgainst.dataset} chartDatasetLabel={averagePointsAgainst.datasetLabel} />
        <BarChart chartName="ownerHighestGameScore" chartLabels={ownerHighestGameScore.labels} chartDataset={ownerHighestGameScore.dataset} chartDatasetLabel={ownerHighestGameScore.datasetLabel} />
        <BarChart chartName="ownerLowestGameScore" chartLabels={ownerLowestGameScore.labels} chartDataset={ownerLowestGameScore.dataset} chartDatasetLabel={ownerLowestGameScore.datasetLabel} />
        <BarChart chartName="ownerAverageGameScore" chartLabels={ownerAverageGameScore.labels} chartDataset={ownerAverageGameScore.dataset} chartDatasetLabel={ownerAverageGameScore.datasetLabel} />
        <BarChart chartName="ownerMostSeasonPointsFor" chartLabels={ownerMostSeasonPointsFor.labels} chartDataset={ownerMostSeasonPointsFor.dataset} chartDatasetLabel={ownerMostSeasonPointsFor.datasetLabel} />
        <BarChart chartName="ownerMinSeasonPointsFor" chartLabels={ownerMinSeasonPointsFor.labels} chartDataset={ownerMinSeasonPointsFor.dataset} chartDatasetLabel={ownerMinSeasonPointsFor.datasetLabel} />
    </div>,
    document.getElementById("root")
);
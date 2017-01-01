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

ReactDOM.render(
    <div>
        <BarChart chartName="WinsChart" chartLabels={winsChart.labels} chartDataset={winsChart.dataset} chartDatasetLabel={winsChart.datasetLabel} />
        <BarChart chartName="LossesChart" chartLabels={lossesChart.labels} chartDataset={lossesChart.dataset} chartDatasetLabel={lossesChart.datasetLabel} />
        <BarChart chartName="WinPChart" chartLabels={winPChart.labels} chartDataset={winPChart.dataset} chartDatasetLabel={winPChart.datasetLabel} />
        <BarChart chartName="MostWinsInSeason" chartLabels={mostWinsInSeason.labels} chartDataset={mostWinsInSeason.dataset} chartDatasetLabel={mostWinsInSeason.datasetLabel} />
        <BarChart chartName="MostLossesInSeason" chartLabels={mostLossesInSeason.labels} chartDataset={mostLossesInSeason.dataset} chartDatasetLabel={mostLossesInSeason.datasetLabel} />
        <BarChart chartName="AverageWinsInSeason" chartLabels={averageWinsInSeason.labels} chartDataset={averageWinsInSeason.dataset} chartDatasetLabel={averageWinsInSeason.datasetLabel} />
    </div>,
    document.getElementById("root")
);
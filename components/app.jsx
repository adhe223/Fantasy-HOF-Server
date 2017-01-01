import React from 'react';
import ReactDOM from 'react-dom';
import BarChart from './BarChart';
import DataRetrieval from '../src/js/DataRetrieval';
import ChartData from '../src/js/ChartData';

var retriever = new DataRetrieval(leagueData);
const winsChart = retriever.winsChart();
const lossesChart = retriever.lossesChart();

ReactDOM.render(
    <div>
        <BarChart chartName="winsChart" chartLabels={winsChart.labels} chartDataset={winsChart.dataset} chartDatasetLabel={winsChart.datasetLabel} />
        <BarChart chartName="lossesChart" chartLabels={lossesChart.labels} chartDataset={lossesChart.dataset} chartDatasetLabel={lossesChart.datasetLabel} />
    </div>,
    document.getElementById("root")
);
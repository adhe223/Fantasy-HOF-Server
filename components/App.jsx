import React from 'react';
import ReactDOM from 'react-dom';
import BarChart from './BarChart';
import MatchupPage from './MatchupPage';
import MenuBar from './MenuBar';
import WLPage from './WLPage';
import PointsPage from './PointsPage';
import DataRetrieval from '../src/js/DataRetrieval';
import ChartData from '../src/js/ChartData';
import Pages from '../src/js/Pages';

const pageWidth = window.innerWidth;

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: Pages.types,
            page: Pages.default
        };
        this.leagueData = this.props.leagueData;
        this.pageWidth = this.props.pageWidth;
        this.charts = {};

        let retriever = new DataRetrieval(this.leagueData);
        retriever.generateAndStoreData(this.charts);

        this.updateApp = this.updateApp.bind(this);
    }

    // Pass this to the child menu bar component. When a button is pressed the child calls this method to update
    updateApp(page) {
        this.setState({page: page});
    }

    render() {
        let content = null;
        switch(Pages.types[this.state.page]) {
            case Pages.types.Home:
                break;
            case Pages.types.WL:
                content = <WLPage charts={this.charts} chartWidth={this.pageWidth}/>;
                break;
            case Pages.types.Points:
                content = <PointsPage charts={this.charts} chartWidth={this.pageWidth}/>;
                break;
            case Pages.types.Matchups:
                content = <MatchupPage owners={this.leagueData.owners}/>;
                break;
        }

        return(
            <div>
                <div>
                    <MenuBar value={ this.state.page } updateMethod={ this.updateApp } />
                </div>
                <div>
                    {content}
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App leagueData={ leagueData } pageWidth={ pageWidth }/>,
    document.getElementById("root")
);
import React from 'react';
import ReactDOM from 'react-dom';
import MatchupPage from './MatchupPage';
import MenuBar from './MenuBar';
import LeaguePage from './LeaguePage';
import WLPage from './WLPage';
import PointsPage from './PointsPage';
import HomePage from './HomePage';
import DataRetrieval from '../src/js/DataRetrieval';
import Pages from '../src/js/Pages';

const pageWidth = window.innerWidth;

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.leagueData = this.props.leagueData;
        this.pageWidth = this.props.pageWidth * 0.95;   // Give a little space around
        let startPage;

        // If we were able to retrieve the data from localStorage, skip the home page
        if (leagueData) {
            startPage = Pages.default;
        } else {
            startPage = Pages.types.Home;
        }

        this.state = {
            pages: Pages.types,
            page: startPage
        };
        this.charts = {};

        let retriever = new DataRetrieval(this.leagueData);
        retriever.generateAndStoreData(this.charts);

        this.updateApp = this.updateApp.bind(this);
        this.updateData = this.updateData.bind(this);
    }

    // Pass this to the child menu bar component. When a button is pressed the child calls this method to update
    updateApp(page) {
        this.setState({page: page});
    }

    // Pass this to the input box component before we have the league data. When the data is successfully grabbed from
    // the web server this method is called and we redraw.
    updateData(leagueData) {
        this.setState({page: Pages.default});
    }

    render() {
        let content = null;

        switch(Pages.types[this.state.page]) {
            case Pages.types.Home:
                content = <HomePage updateMethod={this.updateData}/>;
                break;
            case Pages.types.League:
                content = <LeaguePage charts={this.charts} chartWidth={this.pageWidth}/>;
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

        if (Pages.types[this.state.page] !== Pages.types.Home) {
            // We want the menubar if it isn't the home page
            content =
                <div>
                    <MenuBar value={this.state.page} updateMethod={this.updateApp} />
                    <div className="content" style={{marginTop: 50}}>
                        {content}
                    </div>
                </div>;
        }

        return(
            <div>
                {content}
            </div>
        );
    }
}

ReactDOM.render(
    <App leagueData={leagueData} pageWidth={pageWidth}/>,
    document.getElementById("root")
);
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
        this.charts = {};
        this.pageWidth = this.props.pageWidth * 0.95;   // Give a little space around
        this.localStorageId = "fantasyHOFLeagueData";
        let startPage;

        // If we were able to retrieve the data from localStorage, skip the home page and load the data
        if (this.leagueData) {
            startPage = Pages.default;
            this.retrieveData(this.leagueData, this.charts);
        } else {
            startPage = Pages.types.Home;
        }

        this.state = {
            pages: Pages.types,
            page: startPage
        };

        this.updateApp = this.updateApp.bind(this);
        this.updateData = this.updateData.bind(this);
        this.retrieveData = this.retrieveData.bind(this);
        this.clearData = this.clearData.bind(this)
    }

    // Pass this to the child menu bar component. When a button is pressed the child calls this method to update
    updateApp(page) {
        this.setState({page: page});
    }

    // Pass this to the input box component before we have the league data. When the data is successfully grabbed from
    // the web server this method is called and we redraw.
    updateData(leagueData) {
        this.leagueData = leagueData;
        this.retrieveData(this.leagueData, this.charts);

        // Cache the data in local storage
        localStorage.setItem(this.localStorageId, JSON.stringify(leagueData));

        this.setState({page: Pages.default});
    }

    // Passed to the menu bar so that when the clear button is pressed we remove data from localStorage and go back to Home
    clearData() {
        this.leagueData = null;
        localStorage.removeItem(this.localStorageId);
        this.updateApp(Pages.types.Home);
    }

    retrieveData(leagueData, charts) {
        let retriever = new DataRetrieval(leagueData);
        retriever.generateAndStoreData(charts);
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
                    <MenuBar value={this.state.page} updateMethod={this.updateApp} clearMethod={this.clearData} />
                    <div className="content" style={{marginTop: 65}}>
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
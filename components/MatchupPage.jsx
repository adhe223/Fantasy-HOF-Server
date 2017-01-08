import React from 'react';
import Table from './Table';
import SelectForm from './SelectForm';

class MatchupPage extends React.Component {
    constructor(props) {
        super(props);

        // Get the initial owner selection
        var initialOwner;
        for (var key in this.props.owners) {
            if (this.props.owners.hasOwnProperty(key)) {
                initialOwner = key;
                break;
            }
        }

        this.selectUpdate = this.selectUpdate.bind(this);
        this.getTableData = this.getTableData.bind(this);
        this.state = {owner: initialOwner};
        this.data = [];
    }

    selectUpdate(owner) {
        // Clear the old data
        this.data = [];

        // Change the state and render
        this.setState({owner: owner});
    }

    getTableData() {
        const matchupData = this.props.owners[this.state.owner].matchupSeries;

        // Create the headings
        this.headings = [
            'Opponent',
            'Wins',
            'Losses',
            'Ties',
            'Win Percentage',
            'Points For',
            'Average Points For',
            'Points Against',
            'Average Points Against'
        ];

        // Create the table data
        for (var key in matchupData) {
            if (matchupData.hasOwnProperty(key)) {
                var dataArr = [];

                // Retrieve data to use
                const wins = matchupData[key].wins;
                const losses = matchupData[key].losses;
                const ties = matchupData[key].ties;
                const totalGames = wins + losses + ties;

                // Round floating point data
                const pointsFor = Math.round(matchupData[key].pointsFor * 100) / 100;
                const opponentPoints = Math.round(matchupData[key].opponentPoints * 100) / 100;

                // Calculate stats
                const winP = Math.round((wins / totalGames) * 1000) / 10;
                const PFPer = Math.round(pointsFor / totalGames * 100) / 100;
                const PAPer = Math.round(opponentPoints / totalGames * 100) / 100;

                dataArr.push(matchupData[key].opponent.trim());
                dataArr.push(wins);
                dataArr.push(losses);
                dataArr.push(ties);
                dataArr.push(winP);
                dataArr.push(pointsFor);
                dataArr.push(PFPer);
                dataArr.push(opponentPoints);
                dataArr.push(PAPer);

                this.data.push(dataArr);
            }
        }
    }

    render() {
        this.getTableData();

        return (
            <div>
                <SelectForm externalUpdate={ this.selectUpdate } owners={ this.props.owners } value={ this.state.owner }/>
                <Table headings={ this.headings } data={ this.data }/>
            </div>
        );
    }
}

export default MatchupPage;
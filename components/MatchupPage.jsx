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
        this.headings = ['Opponent', 'Wins', 'Losses', 'Ties', 'Points For', 'Points Against'];

        // Create the table data
        for (var key in matchupData) {
            if (matchupData.hasOwnProperty(key)) {
                var dataArr = [];
                dataArr.push(matchupData[key].opponent.trim());
                dataArr.push(matchupData[key].wins);
                dataArr.push(matchupData[key].losses);
                dataArr.push(matchupData[key].ties);
                dataArr.push(matchupData[key].pointsFor);
                dataArr.push(matchupData[key].opponentPoints);

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
import React from 'react';

class Table extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const headings = this.props.headings;
        const data = this.props.data;
        var tableData = [];
        var i = 1;

        // Table Headings
        var headingsRow = [];
        for (var i = 0; i < headings.length; i++) {
            headingsRow.push(
                <th>{ headings[i] }</th>
            );
        }
        headingsRow = <tr key={ i }> { headingsRow } </tr>;
        tableData.push(headingsRow);
        i++;

        // Table data. Each array in data is a row
        for (var row = 0; row < data.length; row++) {
            var tableRow = [];
            for (var col = 0; col < data[row].length; col++) {
                tableRow.push(
                    <td>{ data[row][col] }</td>
                );
            }

            tableRow = <tr key={ i }> {tableRow} </tr>;
            tableData.push(tableRow);
            i++;
        }
        tableData = <tbody> { tableData } </tbody>;

        return(
            <table>
                { tableData }
            </table>
        );
    }
}

export default Table;
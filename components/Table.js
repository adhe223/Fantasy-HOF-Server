import React from 'react';

class Table extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const headings = this.props.headings;
        const data = this.props.data;
        var tableData = [];
        var elemIndex = 1;

        // Table Headings
        var headingsRow = [];
        for (var i = 0; i < headings.length; i++) {
            headingsRow.push(
                <th key={ elemIndex }>{ headings[i] }</th>
            );
            elemIndex++;
        }
        headingsRow = <tr key={ elemIndex }>{ headingsRow }</tr>;
        tableData.push(headingsRow);
        elemIndex++;

        // Table data. Each array in data is a row
        for (var row = 0; row < data.length; row++) {
            var tableRow = [];
            for (var col = 0; col < data[row].length; col++) {
                tableRow.push(
                    <td key={ elemIndex }>{ data[row][col] }</td>
                );
                elemIndex++;
            }

            tableRow = <tr key={ elemIndex }>{ tableRow }</tr>;
            tableData.push(tableRow);
            elemIndex++;
        }
        tableData = <tbody>{ tableData }</tbody>;

        return(
            <table>
                { tableData }
            </table>
        );
    }
}

export default Table;
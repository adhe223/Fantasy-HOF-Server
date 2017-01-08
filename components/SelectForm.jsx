import React from 'react';

class SelectForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        var selectedOwner = event.target.value;
        this.setState({value: selectedOwner});

        // Call the passed method that tells the parent to update
        if (this.props.externalUpdate) {
            this.props.externalUpdate(selectedOwner);
        }
    }

    render() {
        const owners = this.props.owners;

        var i = 1;
        var ownerList = [];
        for (var key in owners) {
            if (owners.hasOwnProperty(key)) {
                ownerList.push(<option key={ i }>{ owners[key].name }</option>);
                i++;
            }
        }

        return (
            <select value={ this.props.value } name="ownerSelect" onChange={this.handleChange}>
                { ownerList }
            </select>
        );
    }
}

export default SelectForm;
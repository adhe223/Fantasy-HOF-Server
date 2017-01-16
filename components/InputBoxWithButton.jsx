import React from 'react';
import $ from 'jquery';

class InputBoxWithButton extends React.Component {
    constructor(props) {
        super(props);
        this.updateAppData = this.props.updateMethod;

        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        $.ajax({
            type: 'POST',
            url: '/getLeagueDataJSON'
        }).success(function(res) {
            this.updateAppData(res);
        });

        event.preventDefault();
    }
    
    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        ESPN League ID:
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Go!" />
                </form>
            </div>
        );
    }
}

export default InputBoxWithButton;
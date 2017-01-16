import React from 'react';
import $ from 'jquery';

class InputBoxWithButton extends React.Component {
    constructor(props) {
        super(props);
        this.labelText = this.props.labelText;
        this.submitMethod = this.props.submitMethod;

        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        this.submitMethod(event, this.state.value);
    }
    
    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        {this.labelText}
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Go!" />
                </form>
            </div>
        );
    }
}

export default InputBoxWithButton;
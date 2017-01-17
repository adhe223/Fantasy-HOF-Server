import React from 'react';
import css from './styles/inputbox.css';

class InputBoxWithButton extends React.Component {
    constructor(props) {
        super(props);
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
            <div className="form-div">
                <form onSubmit={this.handleSubmit}>
                    <input className="no-select" type="text" value={this.state.value} placeholder="Enter your ESPN League ID" onChange={this.handleChange} />
                    <input className="submit-button" type="submit" value="Go!" />
                </form>
            </div>
        );
    }
}

export default InputBoxWithButton;
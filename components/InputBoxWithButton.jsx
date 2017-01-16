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

    // handleSubmit(event) {
    //     $.ajax({
    //         xhr: function() {
    //             let xhr = new window.XMLHttpRequest();
    //
    //             xhr.addEventListener("progress", function(evt) {
    //                 if (evt.lengthComputable) {
    //                     let percentComplete = evt.loaded / evt.total;
    //                     // Do something with download progress
    //                     console.log(percentComplete);
    //                 }
    //             }, false);
    //
    //             return xhr;
    //         },
    //         context: this,
    //         type: 'POST',
    //         url: '/getLeagueDataJSON',
    //         data: $.param({leagueId: this.state.value}),
    //         success: function(res) {
    //             this.updateAppData(res);
    //         }
    //     });
    //
    //     event.preventDefault();
    // }
    
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
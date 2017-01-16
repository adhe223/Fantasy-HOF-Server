import React from 'react';
import InputBoxWithButton from './InputBoxWithButton';
import Loading from './Loading';
import $ from 'jquery';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.updateMethod = this.props.updateMethod;

        this.state = {loading: false};

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event, leagueId) {
        $.ajax({
            context: this,
            type: 'POST',
            url: '/getLeagueDataJSON',
            data: $.param({leagueId: leagueId}),
            success: function(res) {
                this.updateMethod(res);
            }
        });

        event.preventDefault();
        this.setState({loading: true});
    }
    
    render() {
        let loading;
        if (this.state.loading) {
            loading = <Loading />
        }

        return(
            <div>
                {loading}
                <InputBoxWithButton submitMethod={this.handleSubmit} labelText="ESPN League ID: " />
            </div>
        );
    }
}

export default HomePage;
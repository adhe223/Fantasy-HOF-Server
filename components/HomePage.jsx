import React from 'react';
import InputBoxWithButton from './InputBoxWithButton';
import Loading from './Loading';
import $ from 'jquery';
import css from './styles/homepage.css';

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
            <div className="back" width="100%" height="100%" style={{backgroundColor: '#7a7a7a'}}>
                {loading}
                <object className="picture" data="/images/trophy.svg" type="image/svg+xml">
                    <img src="/images/trophy.png" />
                </object>
                <InputBoxWithButton submitMethod={this.handleSubmit} />
            </div>
        );
    }
}

export default HomePage;
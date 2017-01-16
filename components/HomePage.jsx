import React from 'react';
import InputBoxWithButton from './InputBoxWithButton';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.updateMethod = this.props.updateMethod;
    }
    
    render() {
        return(
            <div>
                <InputBoxWithButton updateMethod={this.updateMethod} />
            </div>
        );
    }
}

export default HomePage;
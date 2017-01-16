import React from 'react';
import css from './styles/loading.css';

class Loading extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <div className="overlay"></div>
                <div className="loading-container">
                    <object data="gears.svg" type="image/svg+xml">
                        <img src="gears.gif" />
                    </object>
                </div>
            </div>
        );
    }
}

export default Loading;
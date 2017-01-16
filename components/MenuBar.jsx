import React from 'react';
import Pages from '../src/js/Pages';
import Helpers from '../src/js/Helpers';
import css from './styles/menubar.css';

class MenuBar extends React.Component {
    constructor(props) {
        super(props);
        this.value = this.props.value;
        this.updateMethod = this.props.updateMethod;
        this.clearMethod = this.props.clearMethod;

        this.handleChange = this.handleChange.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }

    handleChange(event) {
        this.updateMethod(Helpers.getKeyByValue(Pages.types, event.target.textContent));
    }

    handleClear() {
        this.clearMethod();
    }

    render() {
        let elemList = [];

        // Generate the menubar options
        for (let page in Pages.types) {
            if (Pages.types.hasOwnProperty(page)) {
                if (Pages.types[page] === Pages.types.Home) {
                    // We don't want the 'Home' text in the menu bartyj
                    continue;
                }

                let activeClass = "";
                if (this.value === page) {
                    activeClass = "active";
                }

                elemList.push(
                    <li key={page} className={"menuBarButton " + activeClass}
                        onClick={this.handleChange}
                    >{Pages.types[page]}</li>
                );
            }
        }

        // Add the clear button
        elemList.push(
            <li key={'Clear'} className={'menuBarButton right'} onClick={this.handleClear}>
                Clear
            </li>);

        elemList = <ul className="menuBar">{elemList}</ul>;

        return (
            <div>
                {elemList}
            </div>
        );
    }
}

export default MenuBar;
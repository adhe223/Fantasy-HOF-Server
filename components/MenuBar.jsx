import React from 'react';
import Pages from '../src/js/Pages';
import Helpers from '../src/js/Helpers';
import css from './styles/menubar.css';

class MenuBar extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.updateMethod(Helpers.getKeyByValue(Pages.types, event.target.textContent));
    }

    render() {
        const pages = this.props.pages;
        let elemList = [];
        let elemIndex = 1;

        // Generate the menubar options
        for (var page in Pages.types) {
            if (Pages.types.hasOwnProperty(page)) {
                let activeClass = "";
                if (this.props.value === page) {
                    activeClass = "active";
                }

                elemList.push(
                    <li key={ elemIndex } className={ "menuBarButton " + activeClass }
                        onClick={ this.handleChange }
                    >{Pages.types[page]}</li>
                );
                elemIndex++;
            }
        }
        elemList = <ul className="menuBar">{ elemList }</ul>;

        return (
            <div>
                { elemList }
            </div>
        );
    }
}

export default MenuBar;
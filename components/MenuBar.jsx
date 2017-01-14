import React from 'react';
import css from './styles/menubar.css';

class MenuBar extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.updateMethod(event.target.textContent);
    }

    render() {
        const pages = this.props.pages;
        let elemList = [];
        let elemIndex = 1;

        // Generate the menubar options
        for (var i = 0; i < pages.length; i++) {
            let activeClass = "";
            if (this.props.value === pages[i]) {
                activeClass = "active";
            }

            elemList.push(
                <li key={ elemIndex } className={ "menuBarButton " + activeClass } onClick={ this.handleChange }>{ pages[i] }</li>
            );
            elemIndex++;
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
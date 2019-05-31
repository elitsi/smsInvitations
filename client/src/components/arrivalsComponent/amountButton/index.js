import React from "react";
import PropTypes from "prop-types";
import "./amountButton.scss";

export default class AmountButton extends React.Component {

    static props = {
        name: PropTypes.string,
        clickHandler: PropTypes.func,
    };

    handleClick = () => {
        this.props.clickHandler(this.props.name);
    };
    
    render() {
        return (
            <div className="component-button">
                <button onClick={this.handleClick}>{this.props.name}</button>
            </div>
        );
    }
}
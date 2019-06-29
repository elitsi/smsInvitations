import React from "react";
import PropTypes from "prop-types";
import "./amountButton.scss";
import Button from 'react-bootstrap/Button';

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
            <div className="amount-button">
                <Button variant="outline-secondary" onClick={this.handleClick}>{this.props.name}</Button>
            </div>
        );
    }
}
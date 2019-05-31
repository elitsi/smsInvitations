import React from "react";
import AmountButton from "./amountButton";
import DisplayAmount from "./displayAmount";
import calculate from "../../logic/calculate"

export default class ArrivalsComponent extends React.Component {
    // total - current total amount
    // operation: + or -
  state = {
    total: "0",
  };

  handleClick = buttonName => {
    this.setState(calculate(this.state, buttonName));
  };

  render() {
    return (
      <div className="component-app">
        אנא אשרו את הגעתכם
        <div className="component-app">
            <AmountButton name="+" clickHandler={this.handleClick} />
            <DisplayAmount value={this.state.total} />
            <AmountButton name="-" clickHandler={this.handleClick} />
        </div>
      </div>
    );
  }
}
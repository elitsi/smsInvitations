import React from "react";
import PropTypes from "prop-types";

import "./displayAmount.scss";

export default class DisplayAmount extends React.Component {
  static propTypes = {
    value: PropTypes.string,
  };

  render() {
    return (
      <div className="component-display">
        <div>{this.props.value}</div>
      </div>
    );
  }
}
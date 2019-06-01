import React from "react";
import AmountButton from "./amountButton";
import DisplayAmount from "./displayAmount";
import calculate from "../../logic/calculate";
import UpdateButton from "./updateButton";
import { Row, Col, Container, Form } from "react-bootstrap";
import "./arrivalsComponent.scss";
import DishDropdown from "./dishesComponent";

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
      <Container>
        <Form>
          <Row className="component-app justify-content-center arrivals-title">
            אשרו הגעתכם
        </Row>
          <Row className="component-app justify-content-center">
            <Col xs="2"><AmountButton name="+" clickHandler={this.handleClick} /></Col>
            <Col xs="2"><DisplayAmount value={this.state.total} /></Col>
            <Col xs="2"><AmountButton name="-" clickHandler={this.handleClick} /></Col>
          </Row>
          <DishDropdown label="מנה בשרית"/>
          <DishDropdown label="מנת דג"/>
          <DishDropdown label="מנה צמחונית"/>
          <DishDropdown label="מנה טבעונית"/>

          <Row className="component-app justify-content-center">
            <Col xs="5"><UpdateButton></UpdateButton></Col>
          </Row>
        </Form>
      </Container>
    );
  }
}
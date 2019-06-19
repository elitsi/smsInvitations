import React from "react";
import AmountButton from "./amountButton";
import DisplayAmount from "./displayAmount";
import calculate from "../../logic/calculate";
import UpdateButton from "./updateButton";
import { Row, Col, Container, Form } from "react-bootstrap";
import SpecialDishCheckbox from "./specialDishComponent"
import "./arrivalsComponent.scss";

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
      <Container className="arrivals">
        <Row >
          <Col className="wedding-title">הנכם מוזמנים לחתונה של אמבר ואלי</Col>
        </Row>
        <Form>
          <Row className="component-app justify-content-center ">
            <Col xs="7" className="amount-section">
              <Col xs="4"><AmountButton name="+" clickHandler={this.handleClick} /></Col>
              <Col xs="2"><DisplayAmount value={this.state.total} /></Col>
              <Col xs="4"><AmountButton name="-" clickHandler={this.handleClick} /></Col>
            </Col>
            <Col xs="5" className="arrivals-title"> אשרו הגעתכם</Col>
          </Row>

          <SpecialDishCheckbox></SpecialDishCheckbox>

          <Row className="component-app justify-content-center">
            <Col xs="12"><UpdateButton></UpdateButton></Col>
          </Row>
        </Form>
      </Container>
    );
  }
}
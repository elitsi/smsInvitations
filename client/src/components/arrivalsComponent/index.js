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
          <Col className="wedding-title">
            הנכם מוזמנים לחתונה של אמבר ואלי
            <div className="date"><span className="seperator">♪</span><span className="special-font">12.09.2019</span><span className="seperator">♪</span></div>
            <div>יום חמישי<span className="seperator">•</span>הרמוניה בגן</div>
          </Col>
        </Row>
        <Form>
          <Row className="component-app justify-content-center ">
            <Col xs="7" className="amount-section">
              <div className="grid-container">
                <span class="grid-item"><AmountButton name="+" clickHandler={this.handleClick} /></span>
                <span class="grid-item display-amount"><DisplayAmount value={this.state.total} /></span>
                <span class="grid-item"><AmountButton name="-" clickHandler={this.handleClick} /></span>
              </div>
            </Col>
            <Col xs="5" className="arrivals-title"> אשרו הגעתכם</Col>
          </Row>

          <SpecialDishCheckbox></SpecialDishCheckbox>

          <Row className="component-app justify-content-center">
            <Col xs="12"><UpdateButton></UpdateButton></Col>
          </Row>
        </Form>
        <Row className="freepik">
          <a href="http://www.freepik.com">Designed by Freepik</a>
        </Row>
      </Container>
    );
  }
}
import React from "react";
import DishDropdown from './dishesComponent';
import { Form, Container } from "react-bootstrap";
import "./specialDishComponent.scss";

export default class SpecialDishComponent extends React.Component {

    constructor() {
        super();

        this.state = {
            specialDish: false,
            transportCenter: false,
            transportSouth: false
        };
        this.handleChangeSpecialDish = this.handleChangeSpecialDish.bind(this);
        this.handleChangeTransportCenter = this.handleChangeTransportCenter.bind(this);
        this.handleChangeTransportSouth = this.handleChangeTransportSouth.bind(this);
    }

    handleChangeSpecialDish() {
        this.setState({
            specialDish: !this.state.specialDish
        })
    }

    handleChangeTransportCenter() {
        this.setState({
            transportCenter: !this.state.transportCenter
        })
    }

    handleChangeTransportSouth() {
        this.setState({
            transportSouth: !this.state.transportSouth
        })
    }

    render() {
        const dishes = this.state.specialDish
            ? <table>
                <tbody>
                    <DishDropdown label="מנה צמחונית" />
                    <DishDropdown label="מנה טבעונית" />
                    <DishDropdown label="מנה ללא גלוטן" />
                </tbody>
            </table>
            : null;

        return (
            <Container className="checkbox-container">
                <Form.Check type="checkbox">
                    <Form.Check.Label>מנה מיוחדת</Form.Check.Label>
                    <Form.Check.Input type="checkbox" checked={this.state.specialDish} onChange={this.handleChangeSpecialDish} />
                </Form.Check>

                {dishes}

                <Form.Check type="checkbox">
                    <Form.Check.Label>הסעה מבאר שבע</Form.Check.Label>
                    <Form.Check.Input type="checkbox" checked={this.state.transportSouth} onChange={this.handleChangeTransportSouth} />
                </Form.Check>

                <Form.Check type="checkbox">
                    <Form.Check.Label>הסעה מבקעת אונו</Form.Check.Label>
                    <Form.Check.Input type="checkbox" checked={this.state.transportCenter} onChange={this.handleChangeTransportCenter} />
                </Form.Check>
            </Container>);
    }
}
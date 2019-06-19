import React from "react";
import DishDropdown from './dishesComponent';
import { Form, Container } from "react-bootstrap";
import "./specialDishComponent.scss";

export default class SpecialDishComponent extends React.Component {

    constructor() {
        super();

        this.state = {
            specialDish: false,
            transport: false
        };
        this.handleChangeSpecialDish = this.handleChangeSpecialDish.bind(this);
        this.handleChangeTransport = this.handleChangeTransport.bind(this);
    }

    handleChangeSpecialDish() {
        this.setState({
            specialDish: !this.state.specialDish
        })
    }

    handleChangeTransport() {
        this.setState({
            transport: !this.state.transport
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
                    <Form.Check.Input type="checkbox" checked={this.state.transport} onChange={this.handleChangeTransport} />
                </Form.Check>
            </Container>);
    }
}
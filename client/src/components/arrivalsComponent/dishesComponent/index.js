import React from "react";
import { Form } from "react-bootstrap";
import "./dishDropdown.scss";

const DishDropdown = (props) => { //controlId="exampleForm.ControlSelect1"
    return (
        <Form.Group>
            <Form.Control as="select">
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
            </Form.Control>
            <Form.Label>{props.label}</Form.Label>
        </Form.Group>)
};

export default DishDropdown;
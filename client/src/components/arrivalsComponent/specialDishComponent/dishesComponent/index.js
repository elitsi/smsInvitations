import React from "react";
import { Form } from "react-bootstrap";
import "./dishDropdown.scss";

const DishDropdown = (props) => {
    return (
        <tr>
            <td>
                <Form.Group>
<<<<<<< HEAD
                    <Form.Control as="select" onChange={props.onChange}>
=======
                    <Form.Control as="select">
>>>>>>> 5ce7026dcffba58bd8d03650923116529efae7d4
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
                </Form.Group>
            </td>
            <td className="dish-label">
                <Form.Label>{props.label}</Form.Label>
            </td>
        </tr>)
};

export default DishDropdown;
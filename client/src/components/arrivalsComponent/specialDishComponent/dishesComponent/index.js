import React from "react";
import { Form } from "react-bootstrap";
import "./dishDropdown.scss";

const DishDropdown = (props) => {
    
    const numOfOptions = getNumberOfOptions(props.maxOptions);

    return (
        <tr>
            <td>
                <Form.Group>
                    <Form.Control as="select" onChange={props.onChange}>
                        {numOfOptions}
                    </Form.Control>
                </Form.Group>
            </td>
            <td className="dish-label">
                <Form.Label>{props.label}</Form.Label>
            </td>
        </tr>)
};

function getNumberOfOptions(maxOptinos) {
    const res = [];
    for(let i = 0; i <= maxOptinos; i++)  {
        res.push(<option key={i}>{i}</option>);
    };
    return res;
}

export default DishDropdown;
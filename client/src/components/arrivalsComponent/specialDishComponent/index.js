import React from 'react'
import DishDropdown from './dishesComponent'
import { Form, Container } from 'react-bootstrap'
import './specialDishComponent.scss'

const SpecialDishComponent = props => {
  const dishes = props.dishes.specialDish ? (
    <table>
      <tbody>
        {props.dishes.disheTypes.map((dish, index) => {
          return <DishDropdown key={index} label={dish.label} onChange={e => dish.changeCallback(e.target.value)} maxOptions={props.maxOptions} />
        })}
      </tbody>
    </table>
  ) : null

  return (
    <Container className="checkbox-container">
      <Form.Check type="checkbox">
        <div>
          <span style={{fontSize: "12px", marginRight: "3px", position: "relative", "top": "-2px"}}>(לחץ על מנת לפתוח את האפשרויות)</span>
          <Form.Check.Label>מנה מיוחדת</Form.Check.Label>
        <Form.Check.Input type="checkbox" checked={props.dishes.specialDish} onChange={props.handleChangeSpecialDish} />
        </div>
      </Form.Check>

      {dishes}

      {props.transports.transportTypes.map((transport, index) => {
        return (
          <Form.Check key={index} type="checkbox">
            <Form.Check.Label>{transport.label}</Form.Check.Label>
            <Form.Check.Input type="checkbox" checked={transport.value} onChange={transport.changeCallback} />
          </Form.Check>
        )
      })}
    </Container>
  )
}

export default SpecialDishComponent

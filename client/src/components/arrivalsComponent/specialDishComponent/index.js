import React from 'react'
import DishDropdown from './dishesComponent'
import { Form, Container } from 'react-bootstrap'
import './specialDishComponent.scss'

const SpecialDishComponent = props => {
  const dishes = props.dishes.specialDish ? (
    <table>
      <tbody>
        {props.dishes.disheTypes.map(dish => {
          return <DishDropdown label={dish.label} onChange={e => dish.changeCallback(e.target.value)} />
        })}
      </tbody>
    </table>
  ) : null

  return (
    <Container className="checkbox-container">
      <Form.Check type="checkbox">
        <Form.Check.Label>מנה מיוחדת</Form.Check.Label>
        <Form.Check.Input type="checkbox" checked={props.dishes.specialDish} onChange={props.handleChangeSpecialDish} />
      </Form.Check>

      {dishes}

      {props.transports.transportTypes.map(transport => {
        return (
          <Form.Check type="checkbox">
            <Form.Check.Label>{transport.label}</Form.Check.Label>
            <Form.Check.Input type="checkbox" checked={transport.value} onChange={transport.changeCallback} />
          </Form.Check>
        )
      })}
    </Container>
  )
}

export default SpecialDishComponent

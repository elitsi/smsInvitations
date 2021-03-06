import React from 'react'
import AmountButton from './amountButton'
import DisplayAmount from './displayAmount'
import calculate from '../../logic/calculate'
import UpdateButton from './updateButton'
import { Row, Col, Container, Form } from 'react-bootstrap'
import SpecialDishCheckbox from './specialDishComponent'
import './arrivalsComponent.scss'
import axios from 'axios'

export default class ArrivalsComponent extends React.Component {
  // total - current total amount
  // operation: + or -

  state = {
    total: 0,
    dishes: {
      specialDish: false,
      vegieDish: 0,
      veganDish: 0,
      glotenFreeDish: 0,
      maxOptions: 0,
    },
    transports: {
      transportSouth: false,
      transportCenter: false,
    },
    answerSent: false,
  }

  constructor() {
    super()

    this.handleDisheChange = this.handleDisheChange.bind(this)
    this.handleTransportChange = this.handleTransportChange.bind(this)
    this.handleChangeSpecialDish = this.handleChangeSpecialDish.bind(this)
    this.handleArrivingAmountClick = this.handleArrivingAmountClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleArrivingAmountClick = buttonName => {
    const newAmount = calculate(this.state, buttonName)
    const dishes = { ...this.state.dishes }
    dishes.maxOptions = newAmount

    this.setState({ total: newAmount, dishes })
  }

  handleChangeSpecialDish() {
    const dishes = { ...this.state.dishes }
    dishes.specialDish = !dishes.specialDish
    this.setState({
      dishes,
    })
  }

  handleTransportChange(transportKey) {
    const existingTransportKeys = ['transportSouth', 'transportCenter']
    const leftoverKey = existingTransportKeys.filter(key => key !== transportKey)

    const transports = { ...this.state.transports }
    transports[transportKey] = !transports[transportKey]
    transports[leftoverKey] = false

    this.setState({ transports })
  }

  handleDisheChange = (dishKey, amount) => {
    let dishes = { ...this.state.dishes }
    const parsedAmount = parseInt(amount)
    dishes[dishKey] = parsedAmount

    this.setState({ dishes })
  }

  handleSubmit(e) {
    e.preventDefault()

    const res = this.validateData()

    if (!res) {
      return alert('אופס. אנא ודאו את הנתונים.')
    }

    let search = window.location.search
    let params = new URLSearchParams(search)
    let userId = params.get('userId')

    const data = {
      userId: userId,
      invitationAnswer: this.state.total,
      foodType: {
        vegie: this.state.dishes['vegieDish'],
        vegan: this.state.dishes['veganDish'],
        gloten_free: this.state.dishes['glotenFreeDish'],
      },
      transportSouth: this.state.transports.transportSouth,
      transportCenter: this.state.transports.transportCenter,
    }
    console.log(data)

    axios
      .patch('/api/users/updateAnswer', data)
      .then((response) => {
        console.log(response)
        this.setState({answerSent: true});
      })
      .catch((error) => {
        console.log(error)
        alert('משהו השתבש. אנא נסה מאוחר יותר')
      })
  }

  validateData() {
    const total = this.state.total
    const selectedSpecialDishes =
      this.state.dishes.veganDish + this.state.dishes.vegieDish + this.state.dishes.glotenFreeDish
    const transportsValid =
      this.state.transports.transportSouth && this.state.transports.transportCenter ? false : true

    return total >= 0 && total >= selectedSpecialDishes && transportsValid
  }

  render() {
    if (this.state.answerSent) {
      return (
        <Container className="arrivals">
          <Row>
            <Col className="wedding-title">
              .תודה רבה, תשובתכם התקבלה
              <br></br>
              הנכם מגיעים {this.state.total} אנשים
              <br></br>
               !מחכים לראותכם בחתונה
              <br></br>
              <br></br>
              <div className="date">
                <span className="seperator">♪</span>
                <span className="special-font">12.09.2019</span>
                <span className="seperator">♪</span>
              </div>
              <div>
                יום חמישי<span className="seperator">•</span>הרמוניה בגן
              </div>
            </Col>
          </Row>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <Row className="freepik">
            <a href="http://www.freepik.com">Designed by Freepik</a>
          </Row>
        </Container>
      )
    } else {
      const dishes = [
        {
          label: 'מנה צמחונית',
          value: this.state.dishes['vegieDish'],
          changeCallback: amount => this.handleDisheChange('vegieDish', amount),
        },
        {
          label: 'מנה טבעונית',
          value: this.state.dishes['veganDish'],
          changeCallback: amount => this.handleDisheChange('veganDish', amount),
        },
        {
          label: 'מנה ללא גלוטן',
          value: this.state.dishes['glotenFreeDish'],
          changeCallback: amount => this.handleDisheChange('glotenFreeDish', amount),
        },
      ]

      const transports = [
        {
          label: 'הסעה מבאר שבע',
          changeCallback: () => this.handleTransportChange('transportSouth'),
          value: this.state.transports['transportSouth'],
        },
        {
          label: 'הסעה מגני תקווה',
          changeCallback: () => this.handleTransportChange('transportCenter'),
          value: this.state.transports['transportCenter'],
        },
      ]

      const dishesData = {
        disheTypes: dishes,
        specialDish: this.state.dishes.specialDish,
      }

      const transportsData = {
        transportTypes: transports,
      }

      return (
        <Container className="arrivals">
          <Row>
            <Col className="wedding-title">
              הנכם מוזמנים לחתונה של אמבר ואלי
              <div className="date">
                <span className="seperator">♪</span>
                <span className="special-font">12.09.2019</span>
                <span className="seperator">♪</span>
              </div>
              <div>
                יום חמישי<span className="seperator">•</span>הרמוניה בגן
              </div>
            </Col>
          </Row>
          <Form>
            <Row className="component-app justify-content-center ">
              <Col xs="7" className="amount-section">
                <div className="grid-container">
                  <span className="grid-item">
                    <AmountButton name="+" clickHandler={this.handleArrivingAmountClick} />
                  </span>
                  <span className="grid-item display-amount">
                    <DisplayAmount value={this.state.total} />
                  </span>
                  <span className="grid-item">
                    <AmountButton name="-" clickHandler={this.handleArrivingAmountClick} />
                  </span>
                </div>
              </Col>
              <Col xs="5" className="arrivals-title">
                {' '}
                אשרו הגעתכם
              </Col>
            </Row>

            <SpecialDishCheckbox
              maxOptions={this.state.dishes.maxOptions}
              handleChangeSpecialDish={this.handleChangeSpecialDish}
              dishes={dishesData}
              transports={transportsData}
            />

            <Row className="component-app justify-content-center">
              <Col xs="12">
                <UpdateButton onClick={this.handleSubmit} />
              </Col>
            </Row>
          </Form>
          <Row className="freepik">
            <a href="http://www.freepik.com">Designed by Freepik</a>
          </Row>
        </Container>
      )
    }
  }
}

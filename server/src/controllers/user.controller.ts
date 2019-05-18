import express from 'express'
import Controller from '../interfaces/controller.interface'
import {
  getUsers,
  insertUser,
  updateUserAnswer,
} from '../services/user.service'

export default class UserController implements Controller {
  public paths = {
    get: {
      getUsers: '/getUsers',
    },
    post: {
      insertUser: '/insertUser',
      updateUserAnswer: '/updateAnswer',
    },
  }

  public router = express.Router()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(this.paths.get.getUsers, (req, res, next) =>
      this.getUsers(req, res, next)
    )
    this.router.post(this.paths.post.insertUser, (req, res, next) =>
      this.insertUser(req, res, next)
    )
    this.router.post(this.paths.post.updateUserAnswer, (req, res, next) =>
      this.updateUser(req, res, next)
    )
  }

  private async getUsers(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) {
    const users = await getUsers()
    response.send(JSON.stringify(users))
  }

  private async insertUser(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) {
    let validationRes = this.validParams(request)
    if (!validationRes) {
      try {
        const user = {
          firstName: request.body.firstName,
          lastName: request.body.lastName,
          phoneNumber: request.body.phone,
        }
        await insertUser(user)
        response.send('user inserted.')
      } catch (e) {
        console.log(e)
        response.send('Opps. something went wrong.')
      }
    } else {
      response.status(400).send(validationRes)
    }
  }

  private validParams(request: express.Request) {
    const firstName = request.body.firstName
    const lastName = request.body.lastName
    const phone = request.body.phone.replace('-', '')

    if (!firstName || firstName.length === 0) return 'Invalid first name'
    if (!lastName || lastName.length === 0) return 'Invalid last name'
    if (!phone || !phone.match('^[0-9]*$') || phone.length !== 10)
      return 'Invalid phone.'
    return null
  }

  private async updateUser(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) {
    const userId = request.body.userId
    const invitationAnswer = request.body.invitationAnswer
    const foodType = request.body.foodType
    const needRide = request.body.needRide

    if (userId && invitationAnswer && foodType && needRide !== undefined) {
      try {
        await updateUserAnswer({
            userId: userId,
            invitationAnswer: invitationAnswer,
            foodType: foodType,
            needRide: needRide
        })
      } catch (e) {
        console.error(e)
        response.sendStatus(500)
      }
    } else {
      response.status(400).send('Missing params')
    }
  }
}

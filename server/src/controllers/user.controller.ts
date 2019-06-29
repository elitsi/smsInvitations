import express from 'express'
import Controller from '../interfaces/controller.interface'
import { getUsers, insertUser, updateUserAnswer, sendUsersInvitation, loadUsersFromCsv } from '../services/user.service'
import { IFoodType } from '../utils/types/globalTypes';

export default class UserController implements Controller {
  rootPath: string = '/api/users';
  paths = {
    get: {
      getUsers: '/getUsers',
    },
    post: {
      insertUser: '/insertUser',
      sendInvitations: '/sendInvitations',
      loadUsers: '/loadUsersFromLocalFile'
    },
    patch: {
      updateUserAnswer: '/updateAnswer',
    }
  }

  public router = express.Router()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(this.rootPath + this.paths.get.getUsers, (req, res, next) => this.getUsers(req, res, next))
    this.router.post(this.rootPath + this.paths.post.insertUser, (req, res, next) => this.insertUser(req, res, next))
    this.router.patch(this.rootPath + this.paths.patch.updateUserAnswer, (req, res, next) => this.updateInvitation(req, res, next))
    this.router.post(this.rootPath + this.paths.post.sendInvitations, (req, res, next) => this.sendInvitations(req, res, next))
    //this.router.post(this.paths.post.loadUsers, (req, res, next) => this.loadUsersFromCsv(req, res, next))
  }

  private async getUsers(request: express.Request, response: express.Response, next: express.NextFunction) {
    const users = await getUsers()
    response.send(JSON.stringify(users))
  }

  private async insertUser(request: express.Request, response: express.Response, next: express.NextFunction) {
    let validationRes = this.validParams(request)
    if (!validationRes) {
      try {
        await insertUser(request.body.firstName, request.body.lastName, request.body.phoneNumber)
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
    const phone = request.body.phoneNumber.replace('-', '')

    if (!firstName || firstName.length === 0) return 'Invalid first name'
    if (!lastName || lastName.length === 0) return 'Invalid last name'
    if (!phone || !phone.match('^[0-9]*$') || phone.length !== 10) return 'Invalid phone.'
    return null
  }

  private async updateInvitation(request: express.Request, response: express.Response, next: express.NextFunction) {
    const userId: string = request.body.userId
    const invitationAnswer: number = request.body.invitationAnswer
    const foodType: IFoodType = request.body.foodType
    const transportSouth: boolean = request.body.transportSouth;
    const transportCenter: boolean = request.body.transportCenter;

    if (userId && invitationAnswer >= 0 && foodType && transportSouth !== undefined && transportCenter !== undefined) {
      try {
        await updateUserAnswer(userId, invitationAnswer, foodType, transportSouth, transportCenter)
        response.sendStatus(200);
      } catch (e) {
        console.error(e)
        response.sendStatus(500)
      }
    } else {
      response.status(400).send('Missing params')
    }
  }

  private async sendInvitations(request: express.Request, response: express.Response, next: express.NextFunction) {
    try {
      await sendUsersInvitation()
      response.sendStatus(200)
    } catch (error) {
      console.error(error)
      response.sendStatus(500)
    }
  }

  private async loadUsersFromCsv(request: express.Request, response: express.Response, next: express.NextFunction) {
    try {
      await loadUsersFromCsv();
      response.sendStatus(200);
    }
    catch(error) {
      console.error(error);
      response.sendStatus(500);
    }
  }
}

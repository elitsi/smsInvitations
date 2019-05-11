import express from 'express';
import Controller from '../interfaces/controller.interface';
import { getUsers, insertUser} from '../services/user.service';

export default class UserController implements Controller {
    public paths =  {
        get: {
            getUsers: '/getUsers',
        },
        post: {
            insertUser: '/insertUser'
        }
    };
    
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.paths.get.getUsers, (req, res, next) => this.getUsers(req, res, next));
        this.router.post(this.paths.post.insertUser, (req, res, next) =>  this.insertUser(req, res, next));
    }

    private async getUsers(request: express.Request, response: express.Response, next: express.NextFunction) {
        const users = await getUsers();
        response.send(JSON.stringify(users));
    }
    
    private async insertUser(request: express.Request, response: express.Response, next: express.NextFunction) {
        if(this.validParams(request)){
            try {
                await insertUser(request.body.firstName, request.body.lastName);
                response.send("user inserted.");
            }
            catch(e) {
                response.send("Opps. something went wrong.");    
            }
        }
        else {
            response.sendStatus(400);
        }
    }

    private validParams(request: express.Request) {
        const firstName = request.body.firstName;
        const lastName = request.body.lastName;

        if(!firstName || firstName.length === 0) return false;
        if(!lastName || lastName.length === 0) return false;
        return true;
    }

}
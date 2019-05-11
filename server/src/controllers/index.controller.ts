import express from 'express';
import Controller from '../interfaces/controller.interface';
import * as path from 'path';

export default class IndexController implements Controller {
    public paths = {
        get: {
            index: '/'
        }
    }
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.paths.get.index, this.getMainPage);
        this.router.get(`${this.paths.get.index}home`, this.getMainPage);

    }

    private getMainPage(request: express.Request, response: express.Response, next: express.NextFunction) {
        response.sendFile(path.resolve(__dirname, ));
    }

}
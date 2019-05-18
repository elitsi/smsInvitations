import * as bodyParser from 'body-parser';
import express from 'express';
import Controller from './interfaces/controller.interface';
import errorMiddleware from './middlewares/error.middleware';
import mongoose from 'mongoose';
import SMSHandler from './core/smsHandler';

class App {
    public app: express.Application;
    private mongoUrl: string;

    constructor(controllers: Controller[]) {
        this.mongoUrl = process.env.MONGO_URL;
        this.app = express();
        this.initiateDBConnection();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
        const smsHandler = new SMSHandler;
        smsHandler.sendInvitationToUser({firstName: "eli", lastName: "tsinberg", phone: "0543102724"});
    }

    private initiateDBConnection() {
        console.log(this.mongoUrl);
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
    }

    public listen() {
        const port = process.env.PORT || 3000;
        const server = this.app.listen(port, () => {
            console.log(`App listening on the port ${port}`);
        });        
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    private initializeControllers(controllers: Controller[]) {
        controllers.forEach(controller => {
            this.app.use('/', controller.router);
        });
    }
}

export default App;
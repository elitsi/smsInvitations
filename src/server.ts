import App from './app';
import UserController from './controllers/user.controller';
import IndexController from './controllers/index.controller';

const app = new App(
    [
        new UserController(),
        new IndexController()
    ],
);

app.listen();
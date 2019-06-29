import App from './app'
import UserController from './controllers/user.controller'
import IndexController from './controllers/index.controller'

if(process.env.environment != 'prod') {
    const prepareEnvironment = require('./utils/config/prepareEnv').prepareEnvironment;
    prepareEnvironment();
}

const app = new App([new UserController(), new IndexController()])

app.listen()

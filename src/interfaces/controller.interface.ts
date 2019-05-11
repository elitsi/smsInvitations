import { Router } from 'express';

interface IController {
    paths: any;
    router: Router;
}

export default IController;

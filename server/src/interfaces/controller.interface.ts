import { Router } from 'express';

interface IController {
    rootPath: string;
    paths: any;
    router: Router;
}

export default IController;

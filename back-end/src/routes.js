import { Router } from 'express';
import authMiddleware from './auth';
import userController from './application/controllers/userController';
import sessionController from './application/controllers/sessionController';

const routes = new Router();

routes.post('/users', userController.store);
routes.post('/session', sessionController.create);

routes.use(authMiddleware);

export default routes;

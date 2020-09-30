import { Router } from 'express';
import authMiddleware from './auth';
import UserController from './application/controllers/UserController';
import SessionController from './application/controllers/SessionController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/session', SessionController.create);

routes.use(authMiddleware);

export default routes;

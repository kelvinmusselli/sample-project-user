import { Router } from 'express';
import authMiddleware from './auth';
import UserController from './application/controllers/UserController';
import SessionController from './application/controllers/SessionController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/session', SessionController.create);

// OBRIGATION TO USE MIDDLEWARE CONNECT
routes.use(authMiddleware);

// GET USER BY PARAM OR NOTHING
routes.get('/users', UserController.index);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.delete);

export default routes;

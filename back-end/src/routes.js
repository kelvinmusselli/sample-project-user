import { Router } from 'express';

import userController from './application/controllers/userController';
import sessionController from './application/controllers/sessionController';

import authMiddleware from './auth';

const routes = new Router();

routes.post('/users', userController.store);
routes.post('/session', sessionController.Create);

routes.use(authMiddleware);

export default routes;

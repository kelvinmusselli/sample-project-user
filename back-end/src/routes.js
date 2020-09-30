import { Router } from 'express';

import userController from './application/controllers/userController';

const routes = new Router();

routes.get('/users', userController.index);
routes.post('/users', userController.store);

export default routes;

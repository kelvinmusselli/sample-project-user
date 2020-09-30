import express from 'express';
import routes from './routes';
import connectDB from './application/db/connection';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    connectDB();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}
export default new App().server;

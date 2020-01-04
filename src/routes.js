import { Router } from 'express';
import UrlController from './app/controllers/UrlController';
import redisMiddleware from './app/middlewares/redis';

const routes = new Router();

routes.use(redisMiddleware);

routes.get('/', UrlController.store);
routes.get('/:id', UrlController.index);

export default routes;

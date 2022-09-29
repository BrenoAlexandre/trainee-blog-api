import { Express, Request, Response } from 'express';
import postRoutes from './v1/post.routes';
import categoryRoutes from './v1/category.routes';
import userRoutes from './v1/user.routes';

function routes(app: Express) {
  /**
   * @openapi
   * /api/healthcheck:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
  app.get('/api/healthcheck', (req: Request, res: Response) =>
    res.sendStatus(200)
  );

  app.use('/api/v1/post', postRoutes);
  app.use('/api/v1/category', categoryRoutes);
  app.use('/api/v1/user', userRoutes);
}

export default routes;

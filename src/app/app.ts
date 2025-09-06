import express, { Application, Request } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { errorHandler, notFound } from './middleware/errorHandler';
import routes from './routes';
import publicRoutes from './routes/public-routes';
import dotenv from 'dotenv';
import { corsMiddleware } from './config/cors';
import { requireAuth } from '../app/middleware/authRequest';
dotenv.config();

const createApp = (): Application => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(helmet());
  app.use(compression());

  app.use(corsMiddleware);

  const apiUrl = process.env.URL_API || '/';

  if (process.env.NODE_ENV === 'development') {
    morgan.token('body', (req) => {
      const body = (req as Request).body;
      return JSON.stringify(body);
    });

    app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
  }

  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
  });

  app.use(`${apiUrl}`, publicRoutes);

  app.use(`${apiUrl}`, requireAuth(), routes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};

export default createApp();

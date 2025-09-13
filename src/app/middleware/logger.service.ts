import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export const logRequests = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  const oldSend = res.send;
  let responseBody: any;

  res.send = function (body?: any): Response {
    responseBody = body;
    return oldSend.apply(res, [body]);
  };

  res.on('finish', () => {
    const duration = Date.now() - start;

    const log = {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      requestBody: req.body,
      responseBody: parseBody(responseBody)
    };

    logger.info(JSON.stringify(log, null, 2));
  });

  next();
};

const parseBody = (body: any) => {
  if (!body) return null;
  try {
    return typeof body === 'string' ? JSON.parse(body) : body;
  } catch {
    return body;
  }
};

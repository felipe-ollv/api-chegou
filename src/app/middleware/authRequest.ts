import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: string | JwtPayload;
}

type RequireAuthOptions = { optional?: boolean };

export const requireAuth = (options?: RequireAuthOptions): RequestHandler => {
  const handler: RequestHandler = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const auth = req.header('Authorization');

    if (!auth) {
      if (options?.optional) {
        return void next();
      }
      res.status(401).json({ error: 'Missing' });
      return;
    }

    const [scheme, token] = auth.split(' ');

    if (scheme !== 'Bearer' || !token) {
      res.status(401).json({ error: 'Invalid' });
      return;
    }

    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) {
      res.status(500).json({ error: 'JWT secret' });
      return;
    }

    try {
      const decoded = jwt.verify(token, secret);
      (req as AuthRequest).user = decoded;
      next();
    } catch {
      res.status(401).json({ error: 'Invalid or expired token' });
    }
  };

  return handler;
};

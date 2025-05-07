import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const generateAccessToken = (userUuid: string) =>
  jwt.sign({ sub: userUuid }, process.env.JWT_SECRET!, { expiresIn: '1h' });

export const generateRefreshToken = (userUuid: string) =>
  jwt.sign({ sub: userUuid }, process.env.REFRESH_SECRET!, { expiresIn: '7d' });

export const verifyToken = (token: string, secret: string) =>
  jwt.verify(token, secret);
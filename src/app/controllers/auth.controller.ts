import { Request, Response } from 'express';
import * as AuthService from '../services/auth.service';

export const login = async (req: Request, res: Response) => {
  try {
    const { phone, password } = req.body;
    const result = await AuthService.login(phone, password);

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    res.json({ accessToken: result.accessToken, user: result.user });
  } catch (error) {
    res.status(401).json({ error: 'Telefone ou senha incorretos' });
  }
};
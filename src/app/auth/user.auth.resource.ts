import { Request, Response } from 'express';
import { UserAuthService } from './user.auth.service';

export class UserAuthResource {

  static async userAuthUser(req: Request, res: Response): Promise<any> {
    try {
      const value = req.body;
      const resp = await UserAuthService.userAuthService(value);
      return res.json(resp);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao autenticar usuário' });
    }
  }
}
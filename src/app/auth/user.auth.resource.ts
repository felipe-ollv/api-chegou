import { Request, Response } from 'express';
import { UserAuthService } from './user.auth.service';

export class UserAuthResource {

  static async userAuthUser(req: Request, res: Response): Promise<any> {
    try {
      const value = req.body;
      const resp = await UserAuthService.userAuthService(value);
      if (resp.code === 200) {
        return res.status(resp.code).json(resp);
      }
      return res.status(resp.code).json(resp.message);
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno' });
    }
  }
}
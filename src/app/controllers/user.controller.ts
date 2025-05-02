import { Request, Response } from 'express';
import UserService from '../services/user.service';
import { UserInterface } from '../interfaces/users.interface';

export class UserController {

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const data: UserInterface = req.body;
      const existingUser = await UserService.findByPhone(data.phone_number);

      if (!existingUser) {
        await UserService.create(data);
        res.status(201).json({ success: 'Usuário cadastrado!' });
      }
      
      res.status(400).json({ warning: 'Usuário já cadastrado' });
    } catch (error) {
      res.status(500).json({ error: 'Erro interno' });
    }
  }

  static async fetchUser(req: Request, res: Response) {
    try {
      const data = req.params.phone_number
      const existingUser = await UserService.findByPhone(data);

      if (!existingUser) {
        res.status(400).json({ warning: 'Usuário não encontrado' });
      }

      res.status(200).json(existingUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Erro interno' });
    }
  }
}

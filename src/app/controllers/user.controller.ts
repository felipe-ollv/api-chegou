import { Request, Response } from 'express';
import { UserModel } from '../models/user.model';
import { UserInterface } from '../interfaces/users.interface';

export class UserController {
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const data: UserInterface = req.body;
      const existingUser = await UserModel.findByPhone(data.phone_number);
      
      if (existingUser) {
        res.status(400).json({ error: 'Telefone já cadastrado!' });
        return;
      }
      
      await UserModel.create(data);
      res.status(201).json({ success: 'Usuário cadastrado!' });
    } catch (error) {
      res.status(500).json({ error: 'Erro interno' });
    }
  }
}

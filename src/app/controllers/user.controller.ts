import { Request, Response } from 'express';
import UserService from '../services/user.service';
import { UserInterface } from '../interfaces/users.interface';

export class UserController {
  static async create(req: Request, res: Response): Promise<any> {
    const data: UserInterface = req.body;

    if (!UserService.validatePhone(data.phone_number)) {
      return res.status(400).json({ warning: 'Número inválido!' });
    }

    try {
      const existingUser = await UserService.findByPhone(data.phone_number);

      if (existingUser) {
        return res.status(400).json({ warning: 'Usuário já cadastrado!' });
      }

      await UserService.createUser(data);
      return res.status(201).json({ success: 'Usuário cadastrado!' });

    } catch (error) {
      res.status(500).json({ error: 'Erro interno' });
    }
  }

  static async fetch(req: Request, res: Response): Promise<any> {
    const data = req.params.phone_number;

    if (!UserService.validatePhone(data)) {
      return res.status(400).json({ warning: 'Número inválido!' });
    }

    try {
        const existingUser = await UserService.findByPhone(data);

        if (!existingUser) {
          return res.status(400).json({ warning: 'Usuário não encontrado!' });
        }

        return res.status(200).json(existingUser);

    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Erro interno!' });
    }
  }
}

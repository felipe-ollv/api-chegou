import { Request, Response } from 'express';
import UserService from '../services/user.service';
import { UserInterface } from '../interfaces/users.interface';
import { Messages } from '../utils/messages';
import { HttpStatus } from '../utils/http.status';

export class UserController {
  static async create(req: Request, res: Response): Promise<any> {
    const data: UserInterface = req.body;

    if (!UserService.validatePhone(data.phone_number)) {
      return res.status(HttpStatus.badRequest).json({ warning: Messages.error.invalidPhoneNumber });
    }

    try {
      const existingUser = await UserService.findByPhone(data.phone_number);

      if (existingUser) {
        return res
          .status(HttpStatus.badRequest)
          .json({ warning: Messages.error.userAlreadyExists });
      }

      await UserService.createUser(data);
      return res.status(HttpStatus.created).json({ success: Messages.success });
    } catch (error) {
      res.status(HttpStatus.server).json({ error: Messages.error.internalError });
    }
  }

  static async fetch(req: Request, res: Response): Promise<any> {
    const data = req.params.phone_number;

    if (!UserService.validatePhone(data)) {
      return res.status(HttpStatus.badRequest).json({ warning: Messages.error.invalidPhoneNumber });
    }

    try {
      const existingUser = await UserService.findByPhone(data);

      if (!existingUser) {
        return res.status(HttpStatus.badRequest).json({ warning: Messages.warning.userNotFound });
      }

      return res.status(HttpStatus.ok).json(existingUser);
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.server).json({ error: Messages.error.internalError });
    }
  }
}

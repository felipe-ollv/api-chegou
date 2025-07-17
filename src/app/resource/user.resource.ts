import { Request, Response } from "express";
import { userSchema } from "../schemas/user.schema";
import { UserService } from "../services/user.service";

export class UserResource {

  static async findUser(req: Request, res: Response): Promise<any> {
    try {
      const value = req.params.value;
      const resp = await UserService.findUserService(value);

      return res.status(200).json(resp);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao listar usuario' });
    }
  }

  static async registerUser(req: Request, res: Response): Promise<any> {
    try {
      const userData = userSchema.parse(req.body);
      const resp = await UserService.registerUserService(userData);

      return res.status(200).json(resp);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao cadastrar usuário, verifique as informações' });
    }
  }
}
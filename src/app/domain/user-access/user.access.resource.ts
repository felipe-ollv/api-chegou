import { Request, Response } from "express";
import { userAccessSchema } from "./user.access.schema";
import { UserAccessService } from "./user.access.service";

export class UserAccessResource {

  static async findUserAccess(req: Request, res: Response): Promise<any> {
    try {
      const value = req.params.value;
      const resp = await UserAccessService.findUserAccessService(value);

      return res.status(200).json(resp);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao listar acesso do usuario' });
    }
  }

  static async registerUserAccess(req: Request, res: Response): Promise<any> {
    try {
      const userAccessData = userAccessSchema.parse(req.body);
      const resp = await UserAccessService.registerUserAccessService(userAccessData);

      return res.status(200).json(resp);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao cadastrar acesso do usuario, verifique as informações' });
    }
  }

  static async updateUserAccess(req: Request, res: Response): Promise<any> {
    try {
      const userAccessData = req.body;
      const resp = await UserAccessService.updateUserAccessService(userAccessData);

      return res.status(resp.code).json(resp.message);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao atualizar senha' });
    }
  }
}
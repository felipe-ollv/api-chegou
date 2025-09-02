import { Request, Response } from "express";
import { userProfileSchema } from "./user.profile.schema";
import { UserProfileService } from "./user.profile.service";

export class UserProfileResource {

  static async findUserProfile(req: Request, res: Response): Promise<any> {
    try {
      const value = req.params.value;
      const resp = await UserProfileService.findUserProfileService(value);

      return res.status(200).json(resp);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao listar perfil do usuário' });
    }
  }

  static async registerUserProfile(req: Request, res: Response): Promise<any> {
    try {
      const userProfileData = userProfileSchema.parse(req.body);
      const resp = await UserProfileService.registerUserProfileService(userProfileData);

      return res.status(200).json(resp);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao cadastrar perfil do usuário, verifique as informações' });
    }
  }
}
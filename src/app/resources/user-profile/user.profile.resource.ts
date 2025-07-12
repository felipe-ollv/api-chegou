import { Request, Response } from "express";
import { userProfileSchema } from "../../schemas/user-profile/user.profile.schema";
import { UserProfileService } from "../../services/user-profile/user.profile.service";

export class UserProfileResource {

  static async findUserProfile(req: Request, res: Response): Promise<any> {
    try {
      const value = req.params.value;
      const resp = await UserProfileService.findUserProfileService(value);

      return res.status(200).json(resp);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao listar perfil usuario' });
    }
  }

  static async registerUserProfile(req: Request, res: Response): Promise<any> {
    try {
      const userProfileData = userProfileSchema.parse(req.body);
      const resp = await UserProfileService.registerUserProfileService(userProfileData);

      return res.status(200).json(resp);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao cadastrar perfil do usuario, verifique as informações' });
    }
  }
}
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

  static async updateUserProfile(req: Request, res: Response): Promise<any> {
    try {
      const userProfileData = req.body;
      const resp = await UserProfileService.updateUserProfileService(userProfileData);

      return res.status(200).json(resp);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao atualizar perfil do usuário, verifique as informações' });
    }
  }

  static async imageUserProfile(req: Request & { file?: Express.Multer.File }, res: Response): Promise<any> {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'Nenhum arquivo enviado' });
      }
      const { uuidUserProfile } = req.body;
      const filePath = req.file.path;
      const resp = await UserProfileService.imageUserProfileService(uuidUserProfile, filePath);

      if (resp.length > 0) {
        return res.json({ message: 'Imagem do perfil atualizada', code: 200, value: resp[0].profile_image });
      } else {
        return res.json({ message: 'Falha ao atualizar imagem do perfil', code: 400 });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno!' });
    }
  }

  static async fetchImageUserProfile(req: Request & { file?: Express.Multer.File }, res: Response): Promise<any> {
    try {
      const fileName = req.params.value;
      const filePath = await UserProfileService.fetchImageUserProfileService(fileName);

      return res.sendFile(filePath);
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno!' });
    }
  }
}
import { UserProfile } from "./user.profile.schema";
import { UserProfileRepository } from "./user.profile.repository";
import { UserService } from "../user/user.service";

export class UserProfileService {

  static async findUserProfileService(data: any): Promise<any> {
    try {
      const resModel = await UserProfileRepository.findUserProfileByUuid(data);
      return resModel;
    } catch (error) {
      return { message: 'Erro interno', code: 500 }
    }
  }

  static async registerUserProfileService(data: UserProfile): Promise<any> {
    try {
      const resModel = await UserProfileRepository.createUserProfile(data);
      return resModel;
    } catch (error) {
      return { message: 'Erro interno', code: 500 }
    }
  }

  static async updateUserProfileService(data: any): Promise<any> {
    try {
      const userProfile = await UserProfileRepository.findUserProfileByUuid(data.uuid);
      data.uuid_user = userProfile[0].uuid_user;

      const resPromisseAll = await Promise.all([
        UserService.updateUserServiceByProfile(data),
        UserProfileRepository.updateUserProfile(data)
      ])

      if (resPromisseAll.length > 1) {
        return { message: 'Perfil atualizado', code: 200 }
      } else {
        return { message: 'Falha ao atualizar perfil', code: 400 }
      }

    } catch (error) {
      return { message: 'Erro interno', code: 500 }
    }
  }

  static async findUserProfileByPhoneService(data: any): Promise<any> {
    try {
      const resModel = await UserProfileRepository.findUserProfileByPhone(data);
      return resModel;
    } catch (error) {
      return error;
    }
  }

  static async findUserProfileByComposedData(data: any): Promise<any> {
    try {
      const resModel = await UserProfileRepository.findUserProfileByComposedData(data);

      if (resModel === undefined) {
        // Procurar por outro morador do apartamento
      }

      return resModel;
    } catch (error) {
      return error;
    }
  }
}
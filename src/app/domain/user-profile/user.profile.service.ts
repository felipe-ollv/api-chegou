import { UserProfile } from "./user.profile.schema";
import { UserProfileRepository } from "./user.profile.repository";
import { UserService } from "../user/user.service";
import { UserAccessService } from "../user-access/user.access.service";
import path from "path";


export class UserProfileService {

  static async findUserProfileService(data: any): Promise<any> {
    try {
      const resModel = await UserProfileRepository.findUserProfileByUuid(data);
      if (resModel[0].profile_image !== null) {
        resModel[0].profile_image = `${process.env.BASE_URL_ENVIRONMENT}/user-profile/${resModel[0].profile_image}`
      }

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
        const anotherUser = await UserProfileRepository.anotherUser(data);
        if (anotherUser.length > 0) {
          return anotherUser;
        }
      }

      return resModel;
    } catch (error) {
      return error;
    }
  }

  static async imageUserProfileService(uuid_user_profile: string, filePath: string): Promise<any> {
    try {
      let userProfile: Array<any> = [];
      const resModel = await UserProfileRepository.imageUserProfile(uuid_user_profile, filePath);

      if (resModel === 1) {
        userProfile = await UserProfileService.findUserProfileService(uuid_user_profile);
      }

      return userProfile;
    } catch (error) {
      return error;
    }
  }

  static async fetchImageUserProfileService(data: string): Promise<any> {
    try {
      let baseDir: string;

      if (process.env.DIR_UPLOADS) {
        baseDir = process.env.DIR_UPLOADS;
      } else {
        baseDir = path.join(path.resolve(), "uploads");
      }

      const filePath = path.join(baseDir, data);
      return filePath;
    } catch (error) {
      return error;
    }
  }

  static async excludeUserProfileService(data: any): Promise<any> {
    try {
      const userProfile = await UserProfileRepository.findUserProfileByUuid(data);

      const resPromisseAll = await Promise.all([
        UserService.excludeUserServiceByProfile(userProfile[0].uuid_user),
        UserAccessService.excludeUserAccessService(data),
        UserProfileRepository.excludeUserProfile(data)
      ])

      if (resPromisseAll.length > 1) {
        return { message: 'Perfil Excluído', code: 200 }
      } else {
        return { message: 'Falha ao excluir perfil', code: 400 }
      }

    } catch (error) {
      return { message: 'Erro interno', code: 500 }
    }
  }
}
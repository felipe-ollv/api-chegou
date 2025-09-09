import { UserRepository } from "./user.repository";
import { UserProfileRepository } from "../user-profile/user.profile.repository";
import { UserAccessRepository } from "../user-access/user.access.repository";
import { UserChain } from './user.chain';

export class UserService {

  static async findUserService(data: any): Promise<any> {
    try {
      const resModel = await UserRepository.findUserByUuid(data);
      return resModel;
    } catch (error) {
      return error;
    }
  }

  static async registerUserService(data: any): Promise<any> {
    try {
      const { user, user_profile, user_access } = await UserChain.handleComposeData(data);

      const resPromiseAll = await Promise.all([
        UserRepository.createUser(user),
        UserProfileRepository.createUserProfile(user_profile),
        UserAccessRepository.createUserAccess(user_access)
      ])

      if (resPromiseAll.length === 3) {
        return { message: "Cadastrado com sucesso!", code: 200 };
      } else {
        return { message: "Falha ao cadastrar, tente nomvamente mais tarde", code: 400 };
      }

    } catch (error) {
      return { message: "Erro ao cadastrar!", code: 500 };
    }
  }

  static async updateUserServiceByProfile(data: any) {
    try {
      await UserRepository.updateUserByProfile(data);
      return { message: "Usuário atualizado", code: 200 }
    } catch (error) {
      return { message: "Erro ao atualizar!", code: 500 };
    }
  }
}
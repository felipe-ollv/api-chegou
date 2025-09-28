import { UserAccess } from "./user.access.schema";
import { UserAccessRepository } from "./user.access.repository";
import { createHash } from "../../middleware/hash-password";

export class UserAccessService {

  static async findUserAccessService(data: any): Promise<any> {
    try {
      const resModel = await UserAccessRepository.findUserAccessByUuid(data);
      return resModel;
    } catch (error) {
      return error;
    }
  }

  static async registerUserAccessService(data: UserAccess): Promise<any> {
    try {
      const resModel = await UserAccessRepository.createUserAccess(data);
      return resModel;
    } catch (error) {
      return error;
    }
  }

  static async updateUserAccessService(data: any): Promise<any> {
    try {
      const hashPass = await createHash(data.password)
      data.password = hashPass
      const resModel = await UserAccessRepository.updateUserAccess(data);
      if (resModel === 1) {
        return { message: 'Sua senha foi atualizada!', code: 200 }
      } else {
        return { message: 'Falha ao atualizar senha!', code: 400 }
      }
    } catch (error) {
      return { message: 'Erro interno!', code: 500 }
    }
  }

  static async excludeUserAccessService(data: any): Promise<any> {
    try {
      const resModel = await UserAccessRepository.deleteUserAccess(data);
      if (resModel === 1) {
        return { message: '', code: 200 }
      } else {
        return { message: '', code: 400 }
      }
    } catch (error) {

    }
  }
}
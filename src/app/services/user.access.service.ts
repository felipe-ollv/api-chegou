import { UserAccess } from "../schemas/user.access.schema";
import { UserAccessRepository } from "../domain/user/user.access.repository";

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
}
import { User } from "../schemas/user.schema";
import { UserRepository } from "../domain/user/user.repository";

export class UserService {

  static async findUserService(data: any): Promise<any> {
    try {
      const resModel = await UserRepository.findUserByUuid(data);
      return resModel;
    } catch (error) {
      return error;
    }
  }

  static async registerUserService(data: User): Promise<any> {
    try {
      const resModel = await UserRepository.createUser(data);
      return resModel;
    } catch (error) {
      return error;
    }
  }
}
import { UserModel } from '../models/user.model';
import { UserInterface } from '../interfaces/users.interface';
import { isValidPhone } from '../utils/valid.phone';

export default class UserService {
  static async createUser(user: UserInterface): Promise<void> {
    await UserModel.create(user);
  }

  static async findByPhone(phone: string): Promise<UserInterface | any | string> {
    return await UserModel.findByPhone(phone);
  }

  static validatePhone(phone: string): boolean {
    return isValidPhone(phone);
  }
}

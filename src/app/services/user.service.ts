import { UserModel } from '../models/user.model';
import { UserInterface } from '../interfaces/users.interface';

export default class UserService {

  static async create(user: UserInterface): Promise<void> {
    await UserModel.create(user);
  }

  static async findByPhone(phone: string): Promise<UserInterface | undefined> {
    return await UserModel.findByPhone(phone);
  }
}
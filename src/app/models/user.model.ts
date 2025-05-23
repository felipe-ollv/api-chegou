import db from '../database';
import { UserInterface } from '../interfaces/users.interface';

export class UserModel {
  private static tableName = 'users';

  static async create(user: Omit<UserInterface, 'id' | 'updated_at'>): Promise<UserInterface> {
    const [createdUser] = await db(this.tableName)
      .insert({
        ...user,
        created_at: db.fn.now(),
      })
      .returning('*');

    return createdUser;
  }

  static async findByPhone(phone_number: string): Promise<UserInterface | undefined> {
    const result = await db(this.tableName).where({ phone_number }).first();
    return result;
  }

  static async update(user: Partial<UserInterface>): Promise<UserInterface> {
    const [updatedUser] = await db(this.tableName)
      .where('uuid_user', user.uuid_user)
      .update({
        ...user,
        updated_at: db.fn.now(),
      })
      .returning('*');

    return updatedUser;
  }
}

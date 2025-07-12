import db from '../../database'

export class UserRepository {
  private static tableName: 'users'

  static async findUserByUuid(data: string): Promise<any> {
    try {
      const user = await db(this.tableName)
        .where('uuid_user', data)
        .andWhere('deleted', 0)

      return user;
    } catch (error) {
      return error;
    }
  }

  static async createUser(data: any): Promise<any> {
    try {
      const user = await db(this.tableName)
        .insert({
          ...data
        });

      return user;
    } catch (error) {
      return error;
    }
  }
}
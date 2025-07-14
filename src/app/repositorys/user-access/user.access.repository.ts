import db from '../../database'

export class UserAccessRepository {
  private static tableName: 'user_access';

  static async findUserAccessByUuid(data: string): Promise<any> {
    try {
      const user = await db(this.tableName)
        .where('uuid_user', data)
        .andWhere('deleted', 0)

      return user;
    } catch (error) {
      return error;
    }
  }

  static async createUserAccess(data: any): Promise<any> {
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
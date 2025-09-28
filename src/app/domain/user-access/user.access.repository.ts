import db from '../../database'

export class UserAccessRepository {
  private static tableName = 'user_access';

  static async findUserAccessByUuid(data: string): Promise<any> {
    try {
      const user = await db(this.tableName)
        .where('uuid_user_access', data)
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

  static async updateUserAccess(data: any): Promise<any> {
    try {
      const user = await db(this.tableName)
        .where('uuid_user_profile_fk', data.uuid_profile)
        .update({
          password: data.password
        });

      return user;
    } catch (error) {
      return error;
    }
  }

  static async deleteUserAccess(data: any): Promise<any> {
    try {
      const user = await db(this.tableName)
        .where('uuid_user_profile_fk', data)
        .update({
          status: 'DELETED',
          deleted: 1
        });

      return user;
    } catch (error) {
      return error;
    }
  }
}
import db from "../../database";

export class UserProfileRepository {
  private static tableName = 'user_profile';

  static async findUserProfileByUuid(data: string): Promise<any> {
    try {
      const userProfile = await db(this.tableName)
        .where('uuid_user_profile', data)
        .andWhere('deleted', 0)

      return userProfile;
    } catch (error) {
      return error;
    }
  }

  static async createUserProfile(data: any): Promise<any> {
    try {
      const userProfile = await db(this.tableName)
        .insert({
          ...data
        });

      return userProfile;
    } catch (error) {
      return error;
    }
  }
}
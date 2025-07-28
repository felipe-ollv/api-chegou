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

  static async findUserProfileByPhoneService(data: any): Promise<any> {
    try {
      const phone_number = typeof data === "object" ? data.phone_number : data;
      const userProfile = await db('user_profile')
        .select(
          'user_profile.*',
          'users.*',
          'user_access.*',
          'condominium.*'
        )
        .leftJoin('users', 'user_profile.uuid_user_fk', 'users.uuid_user')
        .leftJoin('user_access', 'user_access.uuid_user_profile_fk', 'user_profile.uuid_user_profile')
        .leftJoin('condominium', 'user_profile.uuid_condominium_fk', 'condominium.uuid_condominium')
        .where('user_profile.phone_number', phone_number)
        .andWhere('user_profile.deleted', 0)
        .first();

      return userProfile;
    } catch (error) {
      throw error;
    }
  }
}
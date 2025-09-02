import db from "../../database";

export class UserProfileRepository {
  private static tableName = 'user_profile';

  static async findUserProfileByUuid(data: string): Promise<any> {
    try {
      const userProfile = await db(this.tableName)
        .select(
          "user_profile.apartment_block",
          "user_profile.apartment",
          "user_profile.phone_number",
          "user_profile.type_profile",
          "users.name",
          "condominium.condominium_name",
        )
        .leftJoin("users", "user_profile.uuid_user_fk", "users.uuid_user")
        .leftJoin("condominium", "user_profile.uuid_condominium_fk", "condominium.uuid_condominium")
        .where('user_profile.uuid_user_profile', data)
        .andWhere('user_profile.deleted', 0)
        .andWhere('condominium.deleted', 0);

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

  static async findUserProfileByPhone(data: any): Promise<any> {
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

  static async findUserProfileByComposedData(data: any): Promise<any> {
    try {
      const nameLike = `%${data.recipient.trim().toLowerCase()}%`;
      const q = db(this.tableName)
        .select(
          "user_profile.*",
          "users.*",
          "condominium.*"
        )
        .leftJoin("users", "user_profile.uuid_user_fk", "users.uuid_user")
        .leftJoin(
          "condominium",
          "user_profile.uuid_condominium_fk",
          "condominium.uuid_condominium"
        )
        .where("user_profile.deleted", 0)
        .andWhere("user_profile.apartment_block", data.block)
        .andWhere("user_profile.apartment", data.apartment)
        .andWhereRaw('LOWER(users.name) LIKE ?', [nameLike]);

      const row = await q.first();
      return row;
    } catch (error) {
      return error;
    }
  }
}
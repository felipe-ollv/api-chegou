import db from "../../database";

export class UserProfileRepository {
  private static tableName = 'user_profile';

  static async findUserProfileByUuid(data: string): Promise<any> {
    try {
      const userProfile = await db(this.tableName)
        .leftJoin('users', 'user_profile.uuid_user_fk', 'users.uuid_user')
        .leftJoin('condominium', 'user_profile.uuid_condominium_fk', 'condominium.uuid_condominium')
        .leftJoin('received_package', 'user_profile.uuid_user_profile', 'received_package.uuid_user_profile_receiver')
        .where('user_profile.uuid_user_profile', 'eb09c777-d489-4e8e-b65e-f1ae3893f4ae')
        .andWhere('user_profile.deleted', 0)
        .andWhere('condominium.deleted', 0)
        .andWhere('received_package.deleted', 0)
        .select(
          'user_profile.apartment_block',
          'user_profile.apartment',
          'user_profile.phone_number',
          'user_profile.type_profile',
          'users.name',
          'users.uuid_user',
          'condominium.condominium_name'
        )
        .count('received_package.uuid_package as total_received')
        .select(
          db.raw('SUM(received_package.status_package = "RECEIVED") as total_pending'),
          db.raw('SUM(received_package.status_package = "DELIVERED") as total_delivered')
        )
        .groupBy(
          'user_profile.apartment_block',
          'user_profile.apartment',
          'user_profile.phone_number',
          'user_profile.type_profile',
          'users.name',
          'users.uuid_user',
          'condominium.condominium_name'
        );

      console.log(userProfile);

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

  static async updateUserProfile(data: any): Promise<any> {
    try {
      const updated = await db(this.tableName)
        .where('uuid_user_profile', data.uuid)
        .update({
          apartment_block: data.block,
          apartment: data.apartment,
          phone_number: data.phone,
          updated_at: new Date()
        });

      return updated;
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
        .andWhere("user_profile.uuid_user_profile", data.received)
        .andWhere("user_profile.apartment_block", data.block)
        .andWhere("user_profile.apartment", data.apartment)
        .andWhereRaw('LOWER(users.name) LIKE ?', [nameLike]);

      const result = await q.first();
      return result;
    } catch (error) {
      return error;
    }
  }
}
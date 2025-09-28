import db from "../../database";

export class UserProfileRepository {
  private static tableName = 'user_profile';

  static async findUserProfileByUuid(uuid: string): Promise<any> {
    try {
      const query = `
      SELECT 
        up.apartment_block,
        up.apartment,
        up.phone_number,
        up.type_profile,
        up.profile_image,
        u.name,
        u.uuid_user,
        c.condominium_name,
        COUNT(rp.uuid_package) AS total_received,
        COALESCE(SUM(rp.status_package = 'RECEIVED'), 0) AS total_pending,
        COALESCE(SUM(rp.status_package = 'DELIVERED'), 0) AS total_delivered
      FROM user_profile up
      LEFT JOIN users u 
        ON up.uuid_user_fk = u.uuid_user
      LEFT JOIN condominium c
        ON up.uuid_condominium_fk = c.uuid_condominium
      LEFT JOIN received_package rp
        ON up.uuid_user_profile = rp.uuid_user_profile_receiver
        AND rp.deleted = 0
      WHERE up.uuid_user_profile = ?
        AND up.deleted = 0
        AND c.deleted = 0
      GROUP BY 
        up.apartment_block,
        up.apartment,
        up.phone_number,
        up.type_profile,
        u.name,
        u.uuid_user,
        c.condominium_name;
    `;

      const result = await db.raw(query, [uuid]);

      return result[0];
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
      const userProfile = await db(this.tableName)
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
        .andWhere('user_access.deleted', 0)
        .andWhere('users.deleted', 0)
        .andWhere('user_access.status', 'ACTIVE')
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

      const result = await q.first();
      return result;
    } catch (error) {
      return error;
    }
  }

  static async imageUserProfile(uuid: string, filePath: string): Promise<any> {
    try {
      const userProfileImage = await db(this.tableName)
        .where('uuid_user_profile', uuid)
        .update({
          profile_image: filePath,
          updated_at: new Date()
        });

      return userProfileImage;
    } catch (error) {
      return error;
    }
  }

  static async excludeUserProfile(data: any): Promise<any> {
    try {
      const updated = await db(this.tableName)
        .where('uuid_user_profile', data)
        .update({
          deleted: 1,
          updated_at: new Date()
        });

      return updated;
    } catch (error) {
      return error;
    }
  }
}
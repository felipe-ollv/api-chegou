import db from "../../database";

export class ReceivedPackageRepository {
  private static tableName = "received_package";

  static async findbyUUid(data: string): Promise<any> {
    try {
      const resPackage = await db(this.tableName)
        .select(
          "user_profile.apartment_block",
          "user_profile.apartment",
          "users.name",
          "received_package.*",
          "condominium.condominium_name",
          "condominium.ordinance"
        )
        .leftJoin("user_profile", "received_package.uuid_user_profile_receiver", "user_profile.uuid_user_profile")
        .leftJoin("users", "user_profile.uuid_user_fk", "users.uuid_user")
        .leftJoin("condominium", "user_profile.uuid_condominium_fk", "condominium.uuid_condominium")
        .where('received_package.uuid_user_profile_receiver', data)
        .andWhere('received_package.deleted', 0)
        .andWhere('condominium.deleted', 0)

      return resPackage;
    } catch (error) {
      return error;
    }
  }

  static async createPackage(packageData: any): Promise<any> {
    try {
      const createdPackage = await db(this.tableName)
        .insert({
          ...packageData
        })

      return createdPackage;
    } catch (error) {
      return error;
    }
  }

  static async updatePackage(packageData: any): Promise<any> {
    try {
      const updatedPackageData = await db(this.tableName)
        .where('uuid_package', packageData.uuid_package)
        .update(packageData)

      return updatedPackageData;
    } catch (error) {
      return error;
    }
  }
}
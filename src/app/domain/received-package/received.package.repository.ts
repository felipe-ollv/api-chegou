import db from "../../database";

export class ReceivedPackageRepository {
  private static tableName = "received_package";

  static async findbyUUid(data: string): Promise<any> {
    try {
      const resPackage = await db(this.tableName)
        .select(
          'owner_profile.apartment_block as blockOwner',
          'owner_profile.apartment as apartmentOwner',
          'owner_user.name as ownerName',
          'receiver_profile.apartment_block as blockReceiver',
          'receiver_profile.apartment as apartmentReceiver',
          'receiver_user.name as receiverName',
          'received_package.*',
          'condominium.condominium_name',
          'condominium.ordinance'
        )
        .leftJoin('user_profile as owner_profile', 'received_package.uuid_user_profile_owner', 'owner_profile.uuid_user_profile')
        .leftJoin('users as owner_user', 'owner_profile.uuid_user_fk', 'owner_user.uuid_user')
        .leftJoin('user_profile as receiver_profile', 'received_package.uuid_user_profile_receiver', 'receiver_profile.uuid_user_profile')
        .leftJoin('users as receiver_user', 'receiver_profile.uuid_user_fk', 'receiver_user.uuid_user')
        .leftJoin('condominium', 'owner_profile.uuid_condominium_fk', 'condominium.uuid_condominium')
        .where('received_package.uuid_user_profile_receiver', data)
        .orWhere('received_package.uuid_user_profile_owner', data)
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
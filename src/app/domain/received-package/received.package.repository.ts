import db from "../../database";

export class ReceivedPackageRepository {
  private static tableName = "received_package";

  static async findbyUUid(data: string): Promise<any> {
    try {
      const resPackage = await db(this.tableName)
        .where('uuid_package', data)
        .andWhere('deleted', 0)
        .select();

      return resPackage;
    } catch (error) {
      return error;
    }
  }

  static async create(packageData: any): Promise<any> {
    try {
      const createdPackage = await db(this.tableName)
        .insert({
          ...packageData
        })

      console.log('CREATE', createdPackage);

      return createdPackage;
    } catch (error) {
      return error;
    }
  }

  static async update(packageData: any): Promise<any> {
    try {
      const updatedPackageData = await db(this.tableName)
        .where('uuid_condominium', packageData.uuid_condominium)
        .update(packageData)

      console.log('UPDATE', updatedPackageData);

      return updatedPackageData;
    } catch (error) {
      return error;
    }
  }
}
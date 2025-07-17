import db from "../../database";

export class ReceivedPackageRepository {
  private static tableName = "received_package";

  static async findbyUUid(data: string): Promise<any> {
    try {
      const resPackage = await db(this.tableName)
        .where('uuid_package', data)
        .andWhere('deleted', 0)
        .select();

      console.log('FIND BY', resPackage);

      return resPackage;
    } catch (error) {
      return error;
    }
  }
}
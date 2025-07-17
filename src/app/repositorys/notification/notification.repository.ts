import db from "../../database";

export class NotificationRepository {
  private static tableName = "notification";

  static async findbyUUid(data: string): Promise<any> {
    try {
      const condominium = await db(this.tableName)
        .where('uuid_notification', data)
        .andWhere('deleted', 0)
        .select();

      console.log('FIND BY', condominium);

      return condominium;
    } catch (error) {
      return error;
    }
  }
}
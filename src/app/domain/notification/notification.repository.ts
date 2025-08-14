import db from "../../database";

export class NotificationRepository {
  private static tableName = "notification";

  static async findbyUUid(data: string): Promise<any> {
    try {
      const notificationData = await db(this.tableName)
        .where('uuid_notification', data)
        .andWhere('deleted', 0)
        .select();

      console.log('FIND BY', notificationData);

      return notificationData;
    } catch (error) {
      return error;
    }
  }

  static async createNotification(notificationData: any): Promise<any> {
    try {
      const createdNotification = await db(this.tableName)
        .insert({
          ...notificationData
        })

      console.log('CREATE', createdNotification);

      return createdNotification;
    } catch (error) {
      return error;
    }
  }

  static async updateNotification(notificationData: any): Promise<any> {
    try {
      const updatednotificationData = await db(this.tableName)
        .where('uuid_notification', notificationData.uuid_notification)
        .update(notificationData)

      console.log('UPDATE', updatednotificationData);

      return updatednotificationData;
    } catch (error) {
      return error;
    }
  }
}
import { notificationSchema } from "./notification.schema";
import { NotificationRepository } from "./notification.repository";

export class NotificationService {
  static async findNotificationService(data: any): Promise<any> {
    try {
      const resModel = await NotificationRepository.findbyUUid(data);
      return resModel;
    } catch (error) {
      return error;
    }
  }

  static async createNotificationService(data: any): Promise<any> {
    try {
      const resModel = await NotificationRepository.createNotification(data);
      return resModel;
    } catch (error) {
      return error;
    }
  }

  static async updateNotificationService(data: any): Promise<any> {
    try {
      const resModel = await NotificationRepository.updateNotification(data);
      return resModel;
    } catch (error) {
      return error;
    }
  }
}
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
}
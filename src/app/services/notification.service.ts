import { notificationSchema } from "../schemas/notification.schema";
import { NotificationRepository } from "../domain/notification/notification.repository";

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
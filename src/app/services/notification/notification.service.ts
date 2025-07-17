import { notificationSchema } from "../../schemas/notification/notification.schema";
import { NotificationRepository } from "../../repositorys/notification/notification.repository";

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
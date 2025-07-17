import { Request, Response } from "express";
import { NotificationService } from "../../services/notification/notification.service";

export class NotificationResource {
  static async findNotification(req: Request, res: Response): Promise<any> {
    try {
      const value = req.params.value;
      const resp = await NotificationService.findNotificationService(value);
      return res.status(200).json(resp);
    } catch (error) {
      console.log("ERROR", error);
      return res.status(400).json({ message: 'Erro ao listar notificacao' });
    }
  }
}
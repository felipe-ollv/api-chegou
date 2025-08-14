import { Request, Response } from "express";
import { NotificationService } from "./notification.service";
import { notificationSchema } from "./notification.schema";

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

  static async createNotification(req: Request, res: Response): Promise<any> {
    try {
      const notificationData = notificationSchema.partial().parse(req.body)
      const resp = await NotificationService.createNotificationService(notificationData);
      return res.status(200).json(resp);
    } catch (error) {
      console.log("ERROR", error);
      return res.status(400).json({ message: 'Erro ao registrar notificacao' });
    }
  }

  static async updateNotification(req: Request, res: Response): Promise<any> {
    try {
      const notificationData = notificationSchema.partial().parse(req.body)
      const resp = await NotificationService.updateNotificationService(notificationData);
      return res.status(200).json(resp);
    } catch (error) {
      console.log("ERROR", error);
      return res.status(400).json({ message: 'Erro ao atualizar notificacao' });
    }
  }
}
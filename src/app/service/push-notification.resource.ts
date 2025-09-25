import { Request, Response } from "express";
import { PushNotificationService } from './push-notification.service';
import logger from "../utils/logger";

export class PushNotificationResource {

  static async registerToken(req: Request, res: Response): Promise<any> {
    try {
      const data = req.body;
      const resp = await PushNotificationService.registerTokenService(data);
      logger.info('Persistencia do token para push notification', { data, resp })
    } catch (error: any) {
      logger.info('Falha ap persistir token para push notification', error)
    }
  }
}
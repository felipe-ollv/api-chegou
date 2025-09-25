import { Expo } from "expo-server-sdk";
import { PushNotificationRepository } from "./push-notification.repository";
import logger from "../utils/logger";

const expo = new Expo();

export class PushNotificationService {

  static async registerTokenService(data: any): Promise<any> {
    try {
      const resModel = await PushNotificationRepository.registerUserToken(data);
      return resModel;
    } catch (error) {
      return error;
    }
  }

  static async sendPushNotification(token: string, uuidUserProfile: string, message: string) {

    if (!token || !Expo.isExpoPushToken(token)) {
      logger.error(`Token inválido para o usuário: ${uuidUserProfile}`);
      return;
    }

    const messages = [
      {
        to: token,
        sound: "default",
        body: message,
        data: { withSome: "data" },
      },
    ];

    logger.info('message', messages)

    const chunks = expo.chunkPushNotifications(messages);
    const tickets: any[] = [];

    for (let chunk of chunks) {
      try {
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log('ticketChunk', ticketChunk)
        tickets.push(...ticketChunk);
      } catch (error) {
        logger.error(error);
      }
    }

    return tickets;
  }

  static async checkReceipts(tickets: any[]) {
    const receiptIds = tickets
      .filter((ticket) => ticket.status === "ok" && ticket.id)
      .map((ticket) => ticket.id);

    const receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);

    const allReceipts: any[] = [];

    for (const chunk of receiptIdChunks) {
      try {
        const receipts = await expo.getPushNotificationReceiptsAsync(chunk);
        allReceipts.push(receipts);

        for (const [id, receipt] of Object.entries(receipts)) {
          if (receipt.status === "ok") {
            logger.info(`Notificação ${id} entregue com sucesso!`);
          } else if (receipt.status === "error") {
            logger.error(
              `Erro na notificação ${id}: ${receipt.message}`,
              receipt.details
            );
          }
        }
      } catch (error) {
        logger.error("Erro ao buscar recibos:", error);
      }
    }

    return allReceipts;
  }
}


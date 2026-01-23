import { Expo, ExpoPushMessage } from "expo-server-sdk";
import { PushNotificationRepository } from "./push-notification.repository";
import logger from "../utils/logger";
import fetch from "node-fetch";

const expo = new Expo();
export class PushNotificationService {

  static async registerTokenService(data: any): Promise<any> {
    try {
      const resModel = await PushNotificationRepository.registerUserToken(data);
      return resModel;
    } catch (error) {
      logger.error("Erro ao registrar token:", error);
      return error;
    }
  }

  static async sendPushNotification(token: string, uuidUserProfile: string, text: any, title?: any) {
    if (!token || !Expo.isExpoPushToken(token)) {
      logger.error(`Token inválido para o usuário: ${uuidUserProfile} (${token})`);
      return;
    }

    const safeMessage = text?.trim() || "Você tem uma nova notificação.";

    const message = {
      to: token,
      sound: "default",
      title: `${title ? title : "📦 👀"}`,
      body: safeMessage,
      data: { origin: "push-service", date: new Date().toISOString() },
      channelId: "default",
      priority: "high",
    };

    logger.info("Enviando push notification: ------", message);

    try {
      const response = await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Accept-encoding": "gzip, deflate",
          "Content-Type": "application/json",
        },
        body: JSON.stringify([message]),
      });

      const data = await response.json();
      logger.info("Resposta do Expo Push:", data);
    } catch (error) {
      logger.error("Erro ao enviar notificação:", error);
      return null;
    }
  }

  static async sendPushNotificationsBatch(
    users: { token: string; uuidUserProfile: string }[],
    text: string
  ) {
    if (!users?.length) {
      logger.warn("Nenhum usuário informado para envio de push.");
      return;
    }

    const safeMessage = text?.trim() || "Você tem um novo aviso!";

    const messages: ExpoPushMessage[] = users
      .filter(({ token, uuidUserProfile }) => {
        if (!token || !Expo.isExpoPushToken(token)) {
          logger.error(`Token inválido: ${uuidUserProfile} (${token})`);
          return false;
        }
        return true;
      })
      .map(({ token }) => ({
        to: token,
        sound: "default",
        title: "⚠️ Aviso!",
        body: safeMessage,
        data: { origin: "push-service", date: new Date().toISOString() },
        channelId: "default",
        priority: "high" as const,
      }));

    if (!messages.length) {
      logger.warn("Nenhuma mensagem válida para envio.");
      return;
    }

    logger.info(`Enviando ${messages.length} notificações para o Expo...`);

    try {
      const chunks = expo.chunkPushNotifications(messages);

      for (const chunk of chunks) {
        const response = await fetch("https://exp.host/--/api/v2/push/send", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Accept-encoding": "gzip, deflate",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(chunk),
        });

        const data = await response.json();
        logger.info("Resposta do Expo Push (chunk):", data);
      }
    } catch (error) {
      logger.error("Erro ao enviar notificações em lote:", error);
    }
  }

  static async checkReceipts(tickets: any[]) {
    if (!tickets || tickets.length === 0) {
      logger.warn("Nenhum ticket retornado para verificar recibos.");
      return;
    }

    logger.info("Verificando recibos para tickets:", JSON.stringify(tickets));

    const receiptIds = tickets
      .filter((ticket) => ticket.status === "ok" && ticket.id)
      .map((ticket) => ticket.id);

    if (receiptIds.length === 0) {
      logger.warn("Nenhum receipt ID válido encontrado nos tickets.");
      return;
    }

    const receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
    const allReceipts: any[] = [];

    for (const chunk of receiptIdChunks) {
      try {
        const receipts = await expo.getPushNotificationReceiptsAsync(chunk);
        logger.info("Recibos obtidos:", JSON.stringify(receipts, null, 2));
        allReceipts.push(receipts);

        for (const [id, receipt] of Object.entries(receipts)) {
          if (receipt.status === "ok") {
            logger.info(`Notificação ${id} entregue com sucesso.`);
          } else if (receipt.status === "error") {
            logger.error(
              `Erro na notificação ${id}: ${receipt.message}`,
              receipt.details || {}
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

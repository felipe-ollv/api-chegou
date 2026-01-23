import { ReceivedPackage } from "./received.package.schema";
import { ReceivedPackageRepository } from "./received.package.repository";
import { generateUUID } from '../../utils/uuid.generator';
import { codeGenerator } from "../../utils/code.generator";
import { UserProfileService } from "../user-profile/user.profile.service";
import { NotificationService } from '../notification/notification.service';
import { ReceivedPackageChain } from './received.package.chain';
import { PushNotificationService } from '../../service/push-notification.service';

export class ReceivedPackageService {
  static async findReceivedPackageService(uuidUserProfile: string, page = 1, limit = 20): Promise<any> {
    try {
      const resModel = await ReceivedPackageRepository.findbyUUid(uuidUserProfile, page, limit);
      const list = await ReceivedPackageChain.receiveHandler(resModel.data, uuidUserProfile);
      return {
        ...list,
        pagination: {
          total: resModel.total,
          page: resModel.page,
          hasMore: resModel.hasMore,
        }
      };
    } catch (error) {
      return error;
    }
  }

  static async registerReceivedPackageService(data: any): Promise<any> {
    try {
      const uuid_package = generateUUID();
      const userData: any = await UserProfileService.findUserProfileByComposedData(data);

      if (userData === undefined) {
        return { message: 'Usuário não cadastrado!', code: 400 }
      }

      const receivedPackage: Partial<ReceivedPackage> = {
        "uuid_package": uuid_package,
        "uuid_user_profile_receiver": data.received,
        "uuid_user_profile_owner": userData.uuid_user_profile,
        "status_package": data.received === userData.uuid_user_profile ? "DELIVERED" : "RECEIVED",
        "note": data.note,
        "confirmation_code": codeGenerator().toString(),
        "deleted": 0
      }

      const resModel = await ReceivedPackageRepository.createPackage(receivedPackage);

      if (resModel.length > 0) {

        const notificationData = {
          "uuid_notification": generateUUID(),
          "uuid_package_fk": uuid_package,
          "status": "SENDED"
        }

        const resNotification = await NotificationService.createNotificationService(notificationData);

        if (resNotification.length > 0) {
          console.log('expo token', userData.notification_token)
          PushNotificationService.sendPushNotification(userData.notification_token, userData.uuid_user_profile, 'Tem recebido, corre pra ver!')
          return { message: 'Recebimento registrado', code: 200 }
        }

      } else {
        return { message: 'Falha ao registrar recebimento', code: 400 }
      }

    } catch (error) {
      return { message: 'Erro interno', code: 500 }
    }
  }

  static async updateReceivedPackageService(data: any): Promise<any> {
    try {
      const { updatedPackageData, uuidUserProfile } = await ReceivedPackageRepository.updatePackage(data);
      if (updatedPackageData === 1) {
        const pushServiceToken = await UserProfileService.findUserProfilePushToken(uuidUserProfile);
        PushNotificationService.sendPushNotification(pushServiceToken[0].notification_token, data.uuid_user_profile_owner, 'Recebimento confirmado!')
        return { message: 'Recebimento confirmado', code: 200 }
      } else {
        return { message: 'Verifique o código', code: 400 }
      }
    } catch (error) {
      return { message: 'Erro interno', code: 500 }
    }
  }
}
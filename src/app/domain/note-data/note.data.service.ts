import { generateUUID } from "../../utils/uuid.generator";
import { NoteDataRepository } from "./note.data.repository";
import { UserProfileService } from "../user-profile/user.profile.service";
import { PushNotificationService } from "../../service/push-notification.service";

export class NoteDataService {
  static async findNoteDataService(data: any): Promise<any> {
    try {
      const resModel = await NoteDataRepository.findbyUUid(data);
      return resModel;
    } catch (error) {
      return error;
    }
  }

  static async saveNoteDocument(data: any, filePath: string): Promise<any> {
    try {
      const dataPersist = {
        uuidNoteData: generateUUID(),
        uuidCondominiumFk: data.uuidCondominium,
        content: filePath
      }
      const resModel = await NoteDataRepository.saveNoteDocument(dataPersist);

      if (resModel.lenght > 0) {
        const users = await UserProfileService.findUsersByCondominium(dataPersist.uuidCondominiumFk);
        console.log('tokens users', users);

        PushNotificationService.sendPushNotificationsBatch(users, 'Aviso do síndico(a)')
      }

      return resModel;
    } catch (error) {
      return error;
    }
  }
}
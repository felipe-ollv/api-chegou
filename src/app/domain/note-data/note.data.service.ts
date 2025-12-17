import { generateUUID } from "../../utils/uuid.generator";
import { NoteDataRepository } from "./note.data.repository";
import { UserProfileService } from "../user-profile/user.profile.service";
import { PushNotificationService } from "../../service/push-notification.service";
import path from "path";

export class NoteDataService {
  static async findNoteDataService(data: any): Promise<any> {
    try {
      const resModel = await NoteDataRepository.findbyUUid(data);
      if (resModel.length > 0) {
        resModel.forEach((element) => {
          element.content = `${process.env.BASE_URL_ENVIRONMENT}/note-data/${element.content}`
        });

      }
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


      if (resModel.length > 0) {
        const users = await UserProfileService.findUsersByCondominium(dataPersist.uuidCondominiumFk);
        PushNotificationService.sendPushNotificationsBatch(users, 'Abra para ver ... ');
        return resModel;
      }

      return resModel;
    } catch (error) {
      return error;
    }
  }

  static async fetchNotePdfService(fileName: string): Promise<string> {
    let baseDir: string;

    if (process.env.DIR_PDFS) {
      baseDir = process.env.DIR_PDFS;
    } else {
      baseDir = path.join(path.resolve(), "pdfs");
    }

    const filePath = path.join(baseDir, fileName);
    return filePath;
  }
}
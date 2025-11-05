import { generateUUID } from "../../utils/uuid.generator";
import { NoteDataRepository } from "./note.data.repository";
import { UserProfileService } from "../user-profile/user.profile.service";
import { PushNotificationService } from "../../service/push-notification.service";
import path from "path";

export class NoteDataService {
  static async findNoteDataService(data: any): Promise<any> {
    try {
      const resModel = await NoteDataRepository.findbyUUid(data);
      if (resModel[0].content !== null) {
        resModel[0].content = `${process.env.BASE_URL_ENVIRONMENT}/note-data/${resModel[0].content}`
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
        PushNotificationService.sendPushNotificationsBatch(users, 'Aviso do síndico(a)');
        return resModel;
      }

      return resModel;
    } catch (error) {
      return error;
    }
  }

  static async fetchNotePdfService(fileName: string): Promise<string> {
    let baseDir: string;

    if (process.env.DIR_PFDS) {
      baseDir = process.env.DIR_PFDS;
    } else {
      baseDir = path.join(path.resolve(), "pdfs");
    }

    const filePath = path.join(baseDir, fileName);
    return filePath;
  }
}
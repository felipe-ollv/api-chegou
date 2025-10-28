import { generateUUID } from "../../utils/uuid.generator";
import { NoteDataRepository } from "./note.data.repository";

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
        // chamar serviço para buscar moradores do condominio
        // chamar serviço de push notification
      }

      return resModel;
    } catch (error) {
      return error;
    }
  }
}
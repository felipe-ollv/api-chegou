import { notificationSchema } from "../schemas/notification.schema";
import { NoteDataRepository } from "../domain/note-data/note.data.repository";

export class NoteDataService {
  static async findNoteDataService(data: any): Promise<any> {
    try {
      const resModel = await NoteDataRepository.findbyUUid(data);
      return resModel;
    } catch (error) {
      return error;
    }
  }
}
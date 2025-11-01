import { generateUUID } from "../../utils/uuid.generator";
import db from "../../database";

export class NoteDataRepository {
  private static tableName = "note_data";

  static async findbyUUid(data: string): Promise<any> {
    try {
      const noteData = await db(this.tableName)
        .where('uuid_condominium_fk', data)
        .andWhere('deleted', 0)
        .select();

      return noteData;
    } catch (error) {
      return error;
    }
  }

  static async saveNoteDocument(data: any): Promise<any> {
    try {
      const noteData = await db(this.tableName)
        .insert({
          uuid_note_data: data.uuidNoteData,
          uuid_condominium_fk: data.uuidCondominiumFk,
          content: data.content
        })

      return noteData;
    } catch (error) {

    }
  }
}
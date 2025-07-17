import db from "../../database";

export class NoteDataRepository {
  private static tableName = "note_data";

  static async findbyUUid(data: string): Promise<any> {
    try {
      const noteData = await db(this.tableName)
        .where('uuid_note_data', data)
        .andWhere('deleted', 0)
        .select();

      console.log('FIND BY', noteData);

      return noteData;
    } catch (error) {
      return error;
    }
  }
}
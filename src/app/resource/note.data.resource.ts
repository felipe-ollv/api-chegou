import { Request, Response } from "express";
import { NoteDataService } from "../services/note.data.service";

export class NoteDataResource {
  static async findNoteData(req: Request, res: Response): Promise<any> {
    try {
      const value = req.params.value;
      const resp = await NoteDataService.findNoteDataService(value);
      return res.status(200).json(resp);
    } catch (error) {
      console.log("ERROR", error);
      return res.status(400).json({ message: 'Erro ao listar dados' });
    }
  }
}
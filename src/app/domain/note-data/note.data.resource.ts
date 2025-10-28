import { Request, Response } from "express";
import { NoteDataService } from "./note.data.service";

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

  static async uploadPdf(req: Request & { file?: Express.Multer.File }, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'Nenhum arquivo enviado', code: 400 });
      }

      const data = req.body;
      const filePath = req.file.path;

      const resp = await NoteDataService.saveNoteDocument(data, filePath);

      if (resp.lenght > 0) {
        return res.json({ message: 'Enviado com sucesso!', code: 200, value: filePath });
      }

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno ao enviar', code: 500 });
    }
  }
}
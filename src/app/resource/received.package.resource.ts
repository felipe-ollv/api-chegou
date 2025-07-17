import { Request, Response } from "express";
import { ReceivedPackageService } from "../services/received.package.service";

export class ReceivedPackageResource {
  static async findReceivedPackage(req: Request, res: Response): Promise<any> {
    try {
      const value = req.params.value;
      const resp = await ReceivedPackageService.findReceivedPackageService(value);
      return res.status(200).json(resp);
    } catch (error) {
      console.log("ERROR", error);
      return res.status(400).json({ message: 'Erro ao listar dados' });
    }
  }
}
import { Request, Response } from "express";
import { ReceivedPackageService } from "./received.package.service";

export class ReceivedPackageResource {

  static async findReceivedPackage(req: Request, res: Response): Promise<any> {
    try {
      const value = req.params.value;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;

      const resp = await ReceivedPackageService.findReceivedPackageService(value, page, limit);
      return res.status(200).json(resp);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao listar dados' });
    }
  }

  static async registerReceivedPackage(req: Request, res: Response): Promise<any> {
    try {
      // const packageData = receivedPackageSchema.partial().parse(req.body);

      const resp = await ReceivedPackageService.registerReceivedPackageService(req.body);
      return res.status(resp.code).json(resp.message);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao cadastrar pacote' });
    }
  }

  static async updateReceivedPackage(req: Request, res: Response): Promise<any> {
    try {
      // const packageData = receivedPackageSchema.partial().parse(req.body);
      const resp = await ReceivedPackageService.updateReceivedPackageService(req.body);
      return res.json(resp);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao confirmar' });
    }
  }
}
import { Request, Response } from "express";
import { ReceivedPackageService } from "./received.package.service";
import { receivedPackageSchema } from "./received.package.schema";

export class ReceivedPackageResource {

  static async findReceivedPackage(req: Request, res: Response): Promise<any> {
    try {
      const value = req.params.value;
      const resp = await ReceivedPackageService.findReceivedPackageService(value);
      return res.status(200).json(resp);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao listar dados' });
    }
  }

  static async registerReceivedPackage(req: Request, res: Response): Promise<any> {
    try {
      // const packageData = receivedPackageSchema.partial().parse(req.body);
      const resp = await ReceivedPackageService.registerReceivedPackageService(req.body);
      return res.status(200).json(resp);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao cadastrar pacote' });
    }
  }

  static async updateReceivedPackage(req: Request, res: Response): Promise<any> {
    try {
      const packageData = receivedPackageSchema.partial().parse(req.body);
      const resp = await ReceivedPackageService.registerReceivedPackageService(packageData);
      return res.status(200).json(resp);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao cadastrar pacote' });
    }
  }
}
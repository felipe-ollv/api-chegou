import { Request, Response } from 'express';
import { condominiumSchema } from '../schemas/condominium.schema';
import { CondominiumService } from '../services/condominium.service';

export class CondominiumResource {

  static async findCondominium(req: Request, res: Response): Promise<any> {
    try {
      const value = req.params.value;
      const resp = await CondominiumService.findCondominiumService(value);
      return res.status(200).json(resp);
    } catch (error) {
      console.log("ERROR", error);
      return res.status(400).json({ message: 'Erro ao listar condominio' });
    }
  }

  static async findAllCondominium(req: Request, res: Response): Promise<any> {
    try {
      const resp = await CondominiumService.findAllCondominiumService();
      return res.status(200).json(resp);
    } catch (error) {
      console.log("ERROR", error);
      return res.status(400).json({ message: 'Erro ao listar condominios' });
    }
  }

  static async register(req: Request, res: Response): Promise<any> {
    try {
      const condominiumData = condominiumSchema.parse(req.body);
      const resp = await CondominiumService.registerCondominiumService(condominiumData);
      console.log('RES', resp);
      return res.status(201).json(resp);
    } catch (error: any) {
      console.log("ERROR", error);
      return res.status(400).json({ message: 'Erro ao cadastrar condominio, verifique as informações' });
    }
  }

  static async update(req: Request, res: Response): Promise<any> {
    try {
      const condominiumData = condominiumSchema.parse(req.body);
      console.log(condominiumData)
      const resp = await CondominiumService.updateCondominiumService(condominiumData);
      console.log('RES', resp);
      return res.status(200).json(resp);
    } catch (error: any) {
      console.log("ERROR", error);
      return res.status(400).json({ message: 'Erro ao atualizar condominio, verifique as informações' });
    }
  }

  static async delete(req: Request, res: Response): Promise<any> {
    try {
      const value = req.params.value;
      const resp = await CondominiumService.deleteCondominiumService(value);
      console.log('RES', resp);
      return res.status(resp.statusCode).json({ message: resp.message });
    } catch (error: any) {
      console.log("ERROR", error);
      return res.status(400).json({ message: 'Erro ao excluir condominio' });
    }
  }
}
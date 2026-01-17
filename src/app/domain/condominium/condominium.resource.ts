import { Request, Response } from 'express';
import { condominiumSchema } from './condominium.schema';
import { CondominiumService } from './condominium.service';

export class CondominiumResource {

  static async findCondominium(req: Request, res: Response): Promise<any> {
    try {
      console.log('REQ', req.query.condominiumId)
      const condominiumId = req.query.condominiumId;
      const resp = await CondominiumService.findCondominiumService(condominiumId);
      if (resp) {
        return res.json(resp);
      } else {
        return res.json({ message: '', code: 204 })
      }

    } catch (error) {
      return res.status(400).json({ message: 'Erro ao listar condominio' });
    }
  }

  static async findAllCondominium(req: Request, res: Response): Promise<any> {
    try {
      const resp = await CondominiumService.findAllCondominiumService();
      return res.status(200).json(resp);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao listar condominios' });
    }
  }

  static async register(req: Request, res: Response): Promise<any> {
    try {
      const condominiumData = condominiumSchema.parse(req.body);
      const resp = await CondominiumService.registerCondominiumService(condominiumData);
      return res.status(201).json(resp);
    } catch (error: any) {
      return res.status(400).json({ message: 'Erro ao cadastrar condominio, verifique as informações' });
    }
  }

  static async update(req: Request, res: Response): Promise<any> {
    try {
      const condominiumData = condominiumSchema.parse(req.body);
      const resp = await CondominiumService.updateCondominiumService(condominiumData);
      return res.status(200).json(resp);
    } catch (error: any) {
      return res.status(400).json({ message: 'Erro ao atualizar condominio, verifique as informações' });
    }
  }

  static async delete(req: Request, res: Response): Promise<any> {
    try {
      const value = req.params.value;
      const resp = await CondominiumService.deleteCondominiumService(value);
      return res.status(resp.statusCode).json({ message: resp.message });
    } catch (error: any) {
      return res.status(400).json({ message: 'Erro ao excluir condominio' });
    }
  }
}
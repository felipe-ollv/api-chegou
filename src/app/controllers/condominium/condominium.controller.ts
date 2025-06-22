import { Request, Response } from 'express';
import { condominiumSchema } from '../../schemas/condominium/condominium.schema';
import { CondominiumService } from '../../services/condominium/condominium.service';

export class CondominiumController {
  static async register(req: Request, res: Response): Promise<any> {
    try {
      const condominiumData = condominiumSchema.parse(req.body);
      const resp = await CondominiumService.registerCondominium(condominiumData);
      console.log('RES', resp);
      return res.status(201).json({ message: 'Condominio cadastrado com sucesso' });
    } catch (error: any) {
      console.log("ERROR", error);
      return res.status(400).json({ message: 'Erro ao cadastrar condominio, verifique as informações' });
    }
  }
}
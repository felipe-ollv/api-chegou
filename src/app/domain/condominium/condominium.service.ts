import { Condominium } from "./condominium.schema";
import { CondominiumRepository } from "./condominium.repository";

export class CondominiumService {

  static async findCondominiumService(data: any): Promise<any> {
    try {
      const resModel = await CondominiumRepository.findbyUUid(data);
      if (resModel.length === 0) {
        return { message: '', code: 204 }
      } else {
        return resModel[0];
      }
    } catch (error) {
      return error;
    }
  }

  static async findAllCondominiumService(): Promise<any> {
    try {
      const resModel = await CondominiumRepository.findAll();
      return resModel;
    } catch (error) {
      return error;
    }
  }

  static async registerCondominiumService(data: Condominium): Promise<any> {
    try {
      const resModel = await CondominiumRepository.create(data);
      return resModel;
    } catch (error) {
      return error;
    }
  }

  static async updateCondominiumService(data: Condominium): Promise<any> {
    try {
      const resModel = await CondominiumRepository.update(data);
      return resModel;
    } catch (error) {
      return error;
    }
  }

  static async deleteCondominiumService(data: string): Promise<any> {
    try {
      const exists = await CondominiumService.findCondominiumService(data);
      if (exists.deleted === 0) {
        const resModel = await CondominiumRepository.delete(data);
        return resModel;
      } else {
        return { statusCode: 200, message: 'Condominio não existe!' };
      }

    } catch (error) {
      return error;
    }
  }
}

import { Condominium } from "../../schemas/condominium/condominium.schema";
import { CondominiumModel } from "../../models/condominium/condominium.model";

export class CondominiumService {

  static async findCondominiumService(data: any): Promise<any> {
    try {
      const resModel = await CondominiumModel.findbyUUid(data);
      return resModel;
    } catch (error) {
      return error;
    }
  }

  static async findAllCondominiumService(): Promise<any> {
    try {
      const resModel = await CondominiumModel.findAll();
      return resModel;
    } catch (error) {
      return error;
    }
  }

  static async registerCondominiumService(data: Condominium): Promise<any> {
    try {
      const resModel = await CondominiumModel.create(data);
      console.log(resModel);
      return resModel;
    } catch (error) {
      return error;
    }
  }

  static async updateCondominiumService(data: Condominium): Promise<any> {
    try {
      const resModel = await CondominiumModel.update(data);
      console.log(resModel);
      return resModel;
    } catch (error) {
      return error;
    }
  }

  static async deleteCondominiumService(data: string): Promise<any> {
    try {
      const exists = await CondominiumService.findCondominiumService(data);
      if (exists.deleted === 0) {
        const resModel = await CondominiumModel.delete(data);
        console.log(resModel);
        return resModel;
      } else {
        return 400;
      }

    } catch (error) {
      return error;
    }
  }
}

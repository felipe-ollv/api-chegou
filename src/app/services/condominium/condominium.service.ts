import { Condominium } from "../../schemas/condominium/condominium.schema";
import { CondominiumModel } from "../../models/condominium/condominium.model";

export class CondominiumService {
  static async registerCondominium(data: Condominium): Promise<any> {
    try {
      const resModel = await CondominiumModel.create(data);
      console.log(resModel);
      return resModel;
    } catch (error) {
      return error;
    }
  }
}

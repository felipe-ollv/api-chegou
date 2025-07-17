import { receivedPackageSchema } from "../schemas/received.package.schema";
import { ReceivedPackageRepository } from "../domain/received-package/received.package.repository";

export class ReceivedPackageService {
  static async findReceivedPackageService(data: any): Promise<any> {
    try {
      const resModel = await ReceivedPackageRepository.findbyUUid(data);
      return resModel;
    } catch (error) {
      return error;
    }
  }
}
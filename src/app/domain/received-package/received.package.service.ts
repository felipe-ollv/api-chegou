import { receivedPackageSchema } from "./received.package.schema";
import { ReceivedPackageRepository } from "./received.package.repository";

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
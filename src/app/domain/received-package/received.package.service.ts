import { ReceivedPackage } from "./received.package.schema";
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

  static async registerReceivedPackageService(data: Partial<ReceivedPackage>): Promise<any> {
    try {
      const resModel = await ReceivedPackageRepository.create(data);
      return resModel;
    } catch (error) {
      return error
    }
  }

  static async updateReceivedPackageService(data: Partial<ReceivedPackage>): Promise<any> {
    try {
      const resModel = await ReceivedPackageRepository.update(data);
      return resModel;
    } catch (error) {
      return error
    }
  }
}
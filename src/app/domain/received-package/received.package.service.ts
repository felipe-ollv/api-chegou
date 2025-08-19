import { ReceivedPackage } from "./received.package.schema";
import { ReceivedPackageRepository } from "./received.package.repository";
import { generateUUID } from '../../utils/uuid.generator';
import { UserProfileService } from "../user-profile/user.profile.service";

export class ReceivedPackageService {
  static async findReceivedPackageService(data: any): Promise<any> {
    try {
      const resModel = await ReceivedPackageRepository.findbyUUid(data);
      return resModel;
    } catch (error) {
      return error;
    }
  }

  static async registerReceivedPackageService(data: any): Promise<any> {
    try {
      const userData: any = await UserProfileService.findUserProfileByComposedData(data);
      console.log("user data", userData);

      const receivedPackage: Partial<ReceivedPackage> = {
        "uuid_package": generateUUID(),
        "uuid_user_profile_receiver": "2ec65ee0-708e-499c-8268-ef1679cccea5",
        "uuid_user_profile_owner": userData.uuid_user_profile,
        "status_package": "RECEIVED"
      }

      const resModel = await ReceivedPackageRepository.createPackage(receivedPackage);
      return resModel;
    } catch (error) {
      return error
    }
  }

  static async updateReceivedPackageService(data: Partial<ReceivedPackage>): Promise<any> {
    try {
      const resModel = await ReceivedPackageRepository.updatePackage(data);
      return resModel;
    } catch (error) {
      return error
    }
  }
}
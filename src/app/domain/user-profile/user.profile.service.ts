import { UserProfile } from "./user.profile.schema";
import { UserProfileRepository } from "./user.profile.repository";

export class UserProfileService {

  static async findUserProfileService(data: any): Promise<any> {
    try {
      const resModel = await UserProfileRepository.findUserProfileByUuid(data);
      return resModel;
    } catch (error) {
      return error;
    }
  }

  static async registerUserProfileService(data: UserProfile): Promise<any> {
    try {
      const resModel = await UserProfileRepository.createUserProfile(data);
      return resModel;
    } catch (error) {
      return error;
    }
  }

  static async findUserProfileByPhoneService(data: any): Promise<any> {
    try {
      const resModel = await UserProfileRepository.findUserProfileByPhone(data);
      return resModel;
    } catch (error) {
      return error;
    }
  }

  static async findUserProfileByComposedData(data: any): Promise<any> {
    try {
      const resModel = await UserProfileRepository.findUserProfileByComposedData(data);
      return resModel;
    } catch (error) {
      return error;
    }
  }
}
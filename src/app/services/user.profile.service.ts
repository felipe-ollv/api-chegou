import { UserProfile } from "../schemas/user.profile.schema";
import { UserProfileRepository } from "../domain/user/user.profile.repository";

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
}
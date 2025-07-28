import { UserProfileService } from "../domain/user-profile/user.profile.service";
// import * as bcrypt from "bcryptjs";

export class UserAuthService {
  static async userAuthService(value: any): Promise<any> {
    try {
      const userProfile = await UserProfileService.findUserProfileByPhoneService(value.phone_number);
      console.log('PROFILE', userProfile)
      if (!userProfile) {
        throw new Error("Telefone não encontrado");
      }

      // const senhaCorreta = await bcrypt.compare(password, password);
      // if (!senhaCorreta) {
      //   throw new Error("Senha incorreta");
      // }

      // return {
      //   success: true,
      //   userId: userProfile.user_id,
      //   profile: userProfile,
      // };
    } catch (error) {
      return error;
    }
  }
}


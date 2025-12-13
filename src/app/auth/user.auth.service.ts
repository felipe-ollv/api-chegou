import { UserAccessService } from "../domain/user-access/user.access.service";
import { UserProfileService } from "../domain/user-profile/user.profile.service";
import { generateAccessToken, generateRefreshToken } from './jwt';
import bcrypt from 'bcrypt';

export class UserAuthService {
  static async userAuthService(value: any): Promise<any> {
    try {
      const userProfile = await UserProfileService.findUserProfileByPhoneService(value.phone_number);
      if (userProfile === undefined) {
        return { message: 'Falha ao efetuar login, verifique as informações!', code: 400 }
      } else {
        const senhaCorreta = await bcrypt.compare(value.password, userProfile.password);
        if (!senhaCorreta) {
          return { message: 'Falha ao efetuar login, verifique as informações!', code: 400 }
        } else {
          const token = generateAccessToken(userProfile);
          // const refreshtoken = generateRefreshToken(userProfile);
          return { token, code: 200 };
        }
      }
    } catch (error) {
      return { message: 'Erro interno', code: 500 }
    }
  }

  static async authWebService(value: any): Promise<any> {
    const resValidateKey: any = await UserAccessService.validateKeyAccessService(value.key);

    if (resValidateKey.valid) {
      const userProfile = await UserProfileService.findUserProfileByPhoneService(value.phone_number);
      const refreshtoken = generateRefreshToken(userProfile);

      console.log('REFRESH', refreshtoken);

      // salvar no banco o refresh token

      return { message: 'Acesso web válido por 30 minutos', code: 200 }
    }

  }
}


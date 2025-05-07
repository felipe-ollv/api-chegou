import { generateAccessToken, generateRefreshToken } from '../utils/jwt';
import { comparePassword } from '../utils/password';
import UserService from '../services/user.service';
import { Messages } from '../utils/messages';

export const login = async (phone: string, password: string) => {
  
  const user: any = UserService.findByPhone(phone);

  if (!user || !(await comparePassword(password, user.password))) {
    return { warning: Messages.warning.invalidCredentials}
  }

  const accessToken = generateAccessToken(user.uuid_user);
  const refreshToken = generateRefreshToken(user.uuid_user);

  return {
    accessToken,
    refreshToken,
    user: { uuid_user: user.uuid_user, phone_number: user.phone_number, name: user.name },
  };
};
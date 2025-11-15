import { generateUUID } from '../../utils/uuid.generator';
import { createHash } from '../../middleware/hash-password';
import { UserProfileType } from '../../../types/user-profile-type';
import { UserAccess } from '../user-access/user.access.schema';
import { UserProfile } from '../user-profile/user.profile.schema';
import { User } from './user.schema';

type HandleComposeDataResult = {
  user: User;
  user_profile: UserProfile;
  user_access: UserAccess;
};
export class UserChain {
  static handleProfileType(data: string) {
    const mapping: Record<string, UserProfileType> = {
      'ADM': UserProfileType.ADMIN,
      'MORADOR(A)': UserProfileType.RESIDENT,
      'FUNCIONARIO(A)': UserProfileType.EMPLOYEE,
      'SINDICO': UserProfileType.TRUSTEE,
    };

    if (!mapping[data]) throw new Error('Tipo de perfil inválido');
    return mapping[data];
  }

  static async handleComposeData(data: any): Promise<HandleComposeDataResult> {
    const psswrd = await createHash(data.password);

    const user: User = {
      "uuid_user": generateUUID(),
      "name": data.name,
      "last_name": "",
      "borned": data.birthdate
    }

    const user_profile: UserProfile = {
      "uuid_user_profile": generateUUID(),
      "uuid_user_fk": user.uuid_user,
      "uuid_condominium_fk": data.condominium,
      "apartment_block": data.apartment_block,
      "apartment": parseInt(data.apartment),
      "phone_number": data.phone_number,
      "type_profile": UserChain.handleProfileType(data.type_profile),
      "profile_image": 'uploads/profile-1763222561033.jpg'
    }

    const user_access: UserAccess = {
      "uuid_user_access": generateUUID(),
      "uuid_user_profile_fk": user_profile.uuid_user_profile,
      "status": 'ACTIVE',
      "password": psswrd
    }

    return { user, user_profile, user_access }
  }
}
import { UserProfileType } from '../../types/user-profile-type';

export class UserChain {
  static handleProfileType(data: string) {
    const mapping: Record<string, UserProfileType> = {
      'ADM': UserProfileType.ADMIN,
      'MORADOR': UserProfileType.RESIDENT,
      'FUNCIONARIO': UserProfileType.EMPLOYEE,
      'SINDICO': UserProfileType.TRUSTEE,
    };

    if (!mapping[data]) throw new Error('Tipo de perfil inválido');
    return mapping[data];
  }
}
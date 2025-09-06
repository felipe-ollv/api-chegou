import { User } from "./user.schema";
import { UserProfile } from "../user-profile/user.profile.schema";
import { UserAccess } from "../user-access/user.access.schema";
import { UserRepository } from "./user.repository";
import { UserProfileRepository } from "../user-profile/user.profile.repository";
import { UserAccessRepository } from "../user-access/user.access.repository";
import { generateUUID } from '../../utils/uuid.generator';
import { UserChain } from './user.chain';
import { createHash } from "../../middleware/hash-password";

export class UserService {

  static async findUserService(data: any): Promise<any> {
    try {
      const resModel = await UserRepository.findUserByUuid(data);
      return resModel;
    } catch (error) {
      return error;
    }
  }

  static async registerUserService(data: any): Promise<any> {
    const psswrd = await createHash(data.password);
    try {
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
        "type_profile": UserChain.handleProfileType(data.type_profile)
      }

      const user_access: UserAccess = {
        "uuid_user_access": generateUUID(),
        "uuid_user_profile_fk": user_profile.uuid_user_profile,
        "status": 'ACTIVE',
        "password": psswrd
      }

      const resPromiseAll = await Promise.all([
        UserRepository.createUser(user),
        UserProfileRepository.createUserProfile(user_profile),
        UserAccessRepository.createUserAccess(user_access)
      ])
      console.log('Promise all', resPromiseAll);
      if (resPromiseAll.length === 3) {
        return { message: "Cadastrado com sucesso!" };
      }

      return { message: "Falha ao cadastrar, tente nomvamente mais tarde" };
    } catch (error) {
      return { message: "Erro ao cadastrar!" };
    }
  }

  static async updateUserServiceByProfile(data: any) {
    try {
      await UserRepository.updateUserByProfile(data);
      return { message: "Usuário atualizado" }
    } catch (error) {
      return { message: "Erro ao atualizar!" };
    }
  }
}
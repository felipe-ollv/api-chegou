import { UserProfileType } from "../types/user-profile-type";
import { BaseInterfaceModel } from "./base.interface";

export interface UserProfileInterface extends BaseInterfaceModel {
  uuid_user_profile: string;
  condominium_name: string;
  apartment_block: string;
  apartment: string;
  type_user: UserProfileType;
}
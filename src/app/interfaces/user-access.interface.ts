import { BaseInterfaceModel } from "./base.interface";

export interface UserAccessInterface extends BaseInterfaceModel {
  uuid_user_access: string;
  phone_number: string;
  password: string;
  uuid_user_profile_fk: string;
}
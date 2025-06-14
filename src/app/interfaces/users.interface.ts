import { BaseInterfaceModel } from "./base.interface";

export interface UserInterface extends BaseInterfaceModel {
  uuid_user?: string;
  name: string;
  last_name: string;
  borned: string;
}

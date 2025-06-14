import { PackageStatusType } from "../types/package-status-type";
import { BaseInterfaceModel } from "./base.interface";

export interface PackageReceivedInterface extends BaseInterfaceModel {
  uuid_package_received: string;
  uuid_profile_fk: string;
  status: PackageStatusType;
  date_received: Date;
  date_delivered?: Date;
}

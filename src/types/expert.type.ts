import { IService } from "./service.type";
import { ISpecialization } from "./specialization.type";

export interface IExpert {
  id: number;
  firstName: string;
  lastName: string;
  middleName?: string;
  photo?: string;
  slug: string;
  experienceInYears?: number;
  rank?: number;
  tags?: string[];
  specializations: ISpecialization[];
  services: IService[];
  recordDates: string[];
}

export interface IOverridedExpert extends Omit<IExpert, "id" | "services"> {
  services: string[];
}

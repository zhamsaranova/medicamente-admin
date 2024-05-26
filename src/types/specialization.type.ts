import { IExpert } from "./expert.type";

export interface ISpecialization {
  id: number;
  name: string;
  experts?: IExpert[];
}

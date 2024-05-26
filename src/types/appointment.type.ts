import { IExpert } from "./expert.type";

export interface IAppointment {
  id: number;
  birthDate: string;
  date: Date;
  expertId: number;
  name: string;
  lastName: string;
  phone: string;
  confirmed: boolean;
  expert: IExpert;
}

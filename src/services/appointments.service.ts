import { IAppointment } from "@/types/appointment.type";
import { host, protectedHost } from ".";

export const appointmentService = {
  async getAll() {
    try {
      const { data } = await host.get<IAppointment[]>(`/appointment`);
      return data;
    } catch (e) {
      console.error(e);
    }
  },
  async getOneById(id: number) {
    try {
      const { data } = await host.get<IAppointment>(`/appointment/${id}`);

      return data;
    } catch (e) {
      console.error(e);
    }
  },
  async getOneBySlug(slug: string) {
    try {
      const { data } = await host.get<IAppointment>(
        `/appointment/slug/${slug}`,
      );

      return data;
    } catch (e) {
      console.error(e);
    }
  },
  async delete(id: number) {
    try {
      const { data } = await protectedHost.delete(`/appointment/${id}`);

      return data;
    } catch (e) {
      throw e;
    }
  },
  async confirm(id: number) {
    try {
      const { data } = await protectedHost.patch(`/appointment/confirm/${id}`);

      return data;
    } catch (e) {
      throw e;
    }
  },
};

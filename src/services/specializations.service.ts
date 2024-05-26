import { ISpecialization } from "@/types/specialization.type";
import { host, protectedHost } from ".";

export const specializationsService = {
  async create(
    body: Omit<ISpecialization, "id" | "experts"> & { experts?: string[] },
  ) {
    try {
      const { data } = await protectedHost.post<ISpecialization>(
        `/specialization`,
        body,
      );
      return data;
    } catch (e) {
      throw e;
    }
  },
  async update(
    body: Partial<
      Omit<ISpecialization, "id" | "experts"> & { experts?: string[] }
    >,
    id: number,
  ) {
    try {
      const { data } = await protectedHost.patch<ISpecialization>(
        `/specialization/${id}`,
        body,
      );
      return data;
    } catch (e) {
      throw e;
    }
  },
  async getAll() {
    try {
      const { data } = await host.get<ISpecialization[]>(`/specialization`);
      return data;
    } catch (e) {
      console.error(e);
    }
  },
  async getOneById(id: number) {
    try {
      const { data } = await host.get<ISpecialization>(`/specialization/${id}`);

      return data;
    } catch (e) {
      console.error(e);
    }
  },

  async delete(id: number) {
    try {
      const { data } = await protectedHost.delete(`/specialization/${id}`);

      return data;
    } catch (e) {
      throw e;
    }
  },
};

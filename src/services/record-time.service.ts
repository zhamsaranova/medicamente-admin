import { IRecordTime } from "@/types/record-time.type";
import { host, protectedHost } from ".";
import { TTimeForm } from "@/components/schedule-page/time/create-time-form";

export const recordTimeService = {
  async create(body: TTimeForm): Promise<IRecordTime | undefined> {
    try {
      const { data } = await protectedHost.post<IRecordTime>(
        `/record-time`,
        body,
      );
      return data;
    } catch (e) {
      throw e;
    }
  },
  async update(body: TTimeForm, id: number) {
    const { data } = await protectedHost.patch<IRecordTime>(
      `/record-time/${id}`,
      body,
    );
    return data;
  },
  async getAll() {
    try {
      const { data } = await host.get<IRecordTime[]>(`/record-time`);
      return data;
    } catch (e) {
      console.error(e);
    }
  },

  async delete(id: number) {
    try {
      const { data } = await protectedHost.delete(`/record-time/${id}`);

      return data;
    } catch (e) {
      throw e;
    }
  },
};

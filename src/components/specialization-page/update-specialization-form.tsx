import { paths } from "@/lib/routes";
import { pricesService } from "@/services/prices.service";
import { IPrice } from "@/types/price.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import SpecializationForm, { formSchema } from "./specialization-form";
import { ISpecialization } from "@/types/specialization.type";
import { specializationsService } from "@/services/specializations.service";

const UpdateSpecializationForm = ({
  prefetchedData,
}: {
  prefetchedData: Omit<ISpecialization, "experts"> & {
    experts?: string[];
  };
}) => {
  const queryClient = useQueryClient();
  const { push } = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: prefetchedData,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (
      values: Omit<ISpecialization, "id" | "experts"> & { experts?: string[] },
    ) => specializationsService.update(values, prefetchedData.id),
    onSuccess(data) {
      toast.success("Specialization was updated successfully");
      queryClient.setQueryData(["specializations", data.id], data);
      push(paths.SPECIALIZATIONS);
    },
    onError(e) {
      if (axios.isAxiosError(e)) {
        toast.error(e.response?.data.message);
      }
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <SpecializationForm
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
      submitText="Обновить"
    />
  );
};

export default UpdateSpecializationForm;

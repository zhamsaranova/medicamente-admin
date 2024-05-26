"use client";

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
import { specializationsService } from "@/services/specializations.service";
import { ISpecialization } from "@/types/specialization.type";

const CreateSpecializationForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const queryClient = useQueryClient();
  const { push } = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: (
      values: Omit<ISpecialization, "id" | "experts"> & { experts?: string[] },
    ) => specializationsService.create(values),
    onSuccess() {
      toast.success("New specialization was created successfully");
      queryClient.invalidateQueries({ queryKey: ["specializations"] });
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
    <SpecializationForm form={form} onSubmit={onSubmit} isPending={isPending} />
  );
};

export default CreateSpecializationForm;

"use client";

import { z } from "zod";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { recordTimeService } from "@/services/record-time.service";
import { toast } from "sonner";
import axios from "axios";

export const timeFormSchema = z.object({
  time: z.string(),
});

export type TTimeForm = z.infer<typeof timeFormSchema>;

const CreateTimeForm = () => {
  const form = useForm<TTimeForm>({
    resolver: zodResolver(timeFormSchema),
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data: TTimeForm) => recordTimeService.create(data),
    onSuccess: () => {
      toast.success("New time was added successfully");
      queryClient.invalidateQueries({ queryKey: ["record-times"] });
      form.reset();
    },
    onError: (e) => {
      if (axios.isAxiosError(e)) {
        toast.error(e.response?.data.message);
      }
    },
  });

  const onSubmit = async (data: TTimeForm) => {
    mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2 mt-2">
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="Введите время..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Создать</Button>
      </form>
    </Form>
  );
};

export default CreateTimeForm;

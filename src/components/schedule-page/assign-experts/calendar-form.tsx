"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { expertsService } from "@/services/experts.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ru } from "date-fns/locale";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const datesFormSchema = z.object({
  dates: z.date().array(),
});

export type TDatesForm = z.infer<typeof datesFormSchema>;

const CalendarForm = ({ dates, id }: { dates: Date[]; id: string }) => {
  const form = useForm<TDatesForm>({
    resolver: zodResolver(datesFormSchema),
    values: {
      dates,
    },
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (body: { dates: string[] }) =>
      expertsService.assignDates(body.dates, +id),
    onSuccess: () => {
      toast.success("New dates was added successfully");
      queryClient.invalidateQueries({ queryKey: ["experts"] });
    },
    onError: (e) => {
      if (axios.isAxiosError(e)) {
        toast.error(e.response?.data.message);
      }
    },
  });

  function onSubmit(data: TDatesForm) {
    console.log(data);

    const resultDates = data.dates.map((item) => item.toString());
    mutate({ dates: resultDates });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="dates"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Calendar
                className="rounded-md border"
                locale={ru}
                styles={{
                  day: {
                    border: "1px solid white",
                  },
                  months: {
                    gap: "20px",
                  },
                }}
                mode="multiple"
                numberOfMonths={3}
                selected={field.value}
                onSelect={field.onChange}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Обновить</Button>
      </form>
    </Form>
  );
};

export default CalendarForm;

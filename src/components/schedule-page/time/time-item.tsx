"use client";

import { PenIcon, Trash2 } from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { TTimeForm, timeFormSchema } from "./create-time-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { recordTimeService } from "@/services/record-time.service";
import { IRecordTime } from "@/types/record-time.type";
import clsx from "clsx";
import axios from "axios";
import { toast } from "sonner";

const TimeItem = ({ item }: { item: IRecordTime }) => {
  const [disabled, setDisabled] = useState(true);

  const queryClient = useQueryClient();

  const { mutate: deleteMutate } = useMutation({
    mutationFn: () => recordTimeService.delete(item.id),
    onSuccess: () => {
      toast.success("Time was deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["record-times"] });
    },
    onError: (e) => {
      if (axios.isAxiosError(e)) {
        toast.error(e.response?.data.message);
      }
    },
  });
  const { mutate: updateMutate } = useMutation({
    mutationFn: (body: TTimeForm) => recordTimeService.update(body, item.id),
    onSuccess: () => {
      toast.success("Time was updated successfully");
      queryClient.invalidateQueries({ queryKey: ["record-times", item.id] });
      setDisabled(true);
    },
    onError: (e) => {
      if (axios.isAxiosError(e)) {
        toast.error(e.response?.data.message);
      }
    },
  });

  const form = useForm<TTimeForm>({
    resolver: zodResolver(timeFormSchema),
    defaultValues: {
      time: item.time,
    },
  });

  const onSubmit = (data: TTimeForm) => {
    updateMutate(data);
  };

  useEffect(() => {
    if (disabled) {
      form.reset({ time: item.time });
    }
  }, [disabled]);

  return (
    <div className="flex gap-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    disabled={disabled}
                    placeholder="Введите время..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <Button
        type="button"
        variant={"outline"}
        className={disabled ? "" : "border-blue-300"}
        onClick={() => setDisabled(!disabled)}>
        <PenIcon
          className={clsx(
            "h-5 w-5",
            disabled ? "text-zinc-300" : "text-blue-300",
          )}
        />
      </Button>
      <Button type="button" variant={"outline"} onClick={() => deleteMutate()}>
        <Trash2 className="h-5 w-5 text-red-300" />
      </Button>
    </div>
  );
};

export default TimeItem;

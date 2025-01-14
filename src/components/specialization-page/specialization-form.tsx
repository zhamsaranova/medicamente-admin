"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { UseFormReturn } from "react-hook-form";

export const formSchema = z.object({
  name: z.string().min(3).max(150),
  experts: z.array(z.string()).optional(),
});

type Props = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  isPending: boolean;
  submitText?: string;
};

const SpecializationForm = ({
  form,
  onSubmit,
  isPending,
  submitText = "Создать",
}: Props) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 sm:w-full sm:max-w-xl">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input placeholder="Название" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-3 w-full">
         
          
        </div>

        <Button disabled={isPending} className="mt-3" type="submit">
          {submitText}
        </Button>
      </form>
    </Form>
  );
};

export default SpecializationForm;

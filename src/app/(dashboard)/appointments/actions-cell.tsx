"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { appointmentService } from "@/services/appointments.service";
import { IAppointment } from "@/types/appointment.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

const AppointmentActionCell = ({
  appointment,
}: {
  appointment: IAppointment;
}) => {
  const queryClient = useQueryClient();

  const { mutate: deleteMutation } = useMutation({
    mutationFn: () => appointmentService.delete(appointment.id),
    onSuccess() {
      toast.success("Appointment successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
    onError(e) {
      if (axios.isAxiosError(e)) {
        toast.error(e.response?.data.message);
      }
    },
  });
  const { mutate: updateMutation } = useMutation({
    mutationFn: () => appointmentService.confirm(appointment.id),
    onSuccess() {
      toast.success("Appointment successfully confirmed");
      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });
    },
    onError(e) {
      if (axios.isAxiosError(e)) {
        toast.error(e.response?.data.message);
      }
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Действия</DropdownMenuLabel>

        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => updateMutation()}>
          {appointment.confirmed ? "На рассмотрение" : "Подтвердить"}
        </DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => deleteMutation()}>
          Удалить
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AppointmentActionCell;

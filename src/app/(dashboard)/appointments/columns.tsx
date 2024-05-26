"use client";

import { Badge } from "@/components/ui/badge";
import { IAppointment } from "@/types/appointment.type";
import { ColumnDef, Row } from "@tanstack/react-table";
import AppointmentActionCell from "./actions-cell";
import { IExpert } from "@/types/expert.type";

export const columns: ColumnDef<IAppointment>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "fullname",
    header: "ФИО",
  },
  {
    accessorKey: "birthDate",
    header: "День рождения",
  },
  {
    accessorKey: "date",
    header: "Дата записи",
    cell: ({ row }) => {
      const date = new Date(row.original.date);

      const formattedDate = new Intl.DateTimeFormat("ru-RU", {
        dateStyle: "short",
        timeStyle: "short",
      }).format(date);

      return formattedDate;
    },
  },
  {
    accessorKey: "phone",
    header: "Телефон",
  },
  {
    accessorKey: "expert",
    header: "Специалист",
    cell: (info) =>
      `${info.row.original.expert.firstName} ${info.row.original.expert.lastName}`,
    filterFn: (row, _columnId, filterValue) => {
      const expert: IExpert = row.getValue("expert");
      return `${expert.firstName} ${expert.lastName}`
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    },
  },
  {
    accessorKey: "confirmed",
    header: "Статус",
    cell: ({ row }) => {
      const appointment = row.original;

      return appointment.confirmed ? (
        <Badge variant={"default"}>Подтверждена</Badge>
      ) : (
        <Badge variant={"secondary"}>На рассмотрении</Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const appointment = row.original;

      return <AppointmentActionCell appointment={appointment} />;
    },
  },
];

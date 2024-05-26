"use client";

import { ISpecialization } from "@/types/specialization.type";
import { ColumnDef } from "@tanstack/react-table";
import SpecializationActionsCell from "./actions-cell";

export const columns: ColumnDef<ISpecialization>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "experts",
    header: "Experts count",
    cell: ({ row }) => {
      const specialization = row.original;

      return specialization.experts?.length;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const specialization = row.original;

      return <SpecializationActionsCell specialization={specialization} />;
    },
  },
];

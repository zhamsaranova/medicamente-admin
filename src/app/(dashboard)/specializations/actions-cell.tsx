"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { paths } from "@/lib/routes";
import { pricesService } from "@/services/prices.service";
import { specializationsService } from "@/services/specializations.service";
import { IPrice } from "@/types/price.type";
import { ISpecialization } from "@/types/specialization.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const SpecializationActionsCell = ({
  specialization,
}: {
  specialization: ISpecialization;
}) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => specializationsService.delete(specialization.id),
    onSuccess(data) {
      toast.success("Specialization successfully deleted");
      queryClient.setQueryData(["specializations"], data);
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
        <DropdownMenuLabel>Actions</DropdownMenuLabel>

        <Link href={paths.SPECIALIZATIONS + "/edit/" + specialization.id}>
          <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
        </Link>

        <DropdownMenuItem className="cursor-pointer" onClick={() => mutate()}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SpecializationActionsCell;

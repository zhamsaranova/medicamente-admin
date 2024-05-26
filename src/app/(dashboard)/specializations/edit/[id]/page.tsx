"use client";

import PageTitle from "@/components/page-title";
import UpdatePriceForm from "@/components/price-page/update-price-form";
import UpdateSpecializationForm from "@/components/specialization-page/update-specialization-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { paths } from "@/lib/routes";
import { pricesService } from "@/services/prices.service";
import { specializationsService } from "@/services/specializations.service";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const UpdatePage = ({ params }: { params: { id: string } }) => {
  const { data } = useQuery({
    queryKey: ["specializations", params.id],
    queryFn: () => specializationsService.getOneById(Number(params.id)),
  });

  return (
    <div>
      <div className="flex gap-2 mb-10 items-center">
        <Link href={paths.SPECIALIZATIONS}>
          <Button variant={"outline"} className="h-full">
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </Link>
        <div>
          <p className="text-zinc-400 text-sm">Назад ко всем специализациям</p>
          <PageTitle>Обновить специализацию</PageTitle>
        </div>
      </div>
      <Separator className="mb-10" />

      {data ? (
        <UpdateSpecializationForm
          prefetchedData={{
            ...data,
            experts: data.experts?.map((item) => item.id.toString()),
          }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UpdatePage;

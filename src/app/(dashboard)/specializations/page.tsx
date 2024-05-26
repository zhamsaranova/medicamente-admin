"use client";

import PageHeader from "@/components/page-header";
import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { paths } from "@/lib/routes";
import { specializationsService } from "@/services/specializations.service";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import Link from "next/link";
import { columns } from "./columns";

const SpecializationsPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["specializations"],
    queryFn: () => specializationsService.getAll(),
  });

  return (
    <div>
      <PageHeader>
        <PageTitle>Специализации</PageTitle>

        <Link href={paths.SPECIALIZATIONS + "/create"}>
          <Button className="gap-2">
            <Plus />
            Создать
          </Button>
        </Link>
      </PageHeader>
      {isLoading && <p>Loading...</p>}
      {data && <DataTable columns={columns} data={data} />}
    </div>
  );
};

export default SpecializationsPage;

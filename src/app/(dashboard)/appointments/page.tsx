"use client";

import PageHeader from "@/components/page-header";
import PageTitle from "@/components/page-title";
import { DataTable } from "@/components/ui/data-table";
import { appointmentService } from "@/services/appointments.service";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./columns";

const ExpertsPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["appointments"],
    queryFn: () => appointmentService.getAll(),
  });

  return (
    <div>
      <PageHeader>
        <PageTitle>Записи на прием</PageTitle>
      </PageHeader>
      {isLoading && <p>Loading...</p>}
      {data && <DataTable columns={columns} data={data} isAppointmentsPage />}
    </div>
  );
};

export default ExpertsPage;

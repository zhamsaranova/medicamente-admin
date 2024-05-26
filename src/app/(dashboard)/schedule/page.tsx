"use client";

import PageHeader from "@/components/page-header";
import PageTitle from "@/components/page-title";
import ExpertsSection from "@/components/schedule-page/experts-section";
import RecordTimesSection from "@/components/schedule-page/time/record-times";

const SchedulePage = () => {
  return (
    <div>
      <PageHeader>
        <PageTitle>Расписание</PageTitle>
      </PageHeader>
      <div className="flex justify-between">
        <ExpertsSection />

        <aside className="max-w-96 w-full p-5 flex flex-col items-center rounded-md border-spacing-1 border">
          <RecordTimesSection />
        </aside>
      </div>
    </div>
  );
};

export default SchedulePage;

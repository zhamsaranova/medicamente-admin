"use client";

import { expertsService } from "@/services/experts.service";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import CalendarForm from "./assign-experts/calendar-form";
import { useState } from "react";

const ExpertsSection = () => {
  const [activeExpert, setActiveExpert] = useState<string>("");
  const [dates, setDates] = useState<Date[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ["experts"],
    queryFn: () => expertsService.getAll(),
  });

  return (
    <div>
      <h3 className="font-semibold mb-4">Специалисты</h3>

      <Select
        onValueChange={(e) => {
          setActiveExpert(e);
          const expert = data?.find((item) => item.id === +e);
          const dateStrings = expert?.recordDates.map((item) => new Date(item));

          if (dateStrings) {
            setDates(dateStrings);
          }
        }}
        value={activeExpert}>
        <SelectTrigger className="w-[280px] mb-3">
          <SelectValue placeholder="Выберите специалиста" />
        </SelectTrigger>
        <SelectContent>
          {data?.map((item) => (
            <SelectItem key={item.id} value={item.id.toString()}>
              {`${item.lastName} ${item.firstName} ${item.middleName} `}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <CalendarForm dates={dates} id={activeExpert} />
    </div>
  );
};

export default ExpertsSection;

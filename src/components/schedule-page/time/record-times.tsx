"use client";

import { recordTimeService } from "@/services/record-time.service";
import { useQuery } from "@tanstack/react-query";
import { TimerIcon } from "lucide-react";
import { z } from "zod";
import { Button } from "../../ui/button";
import { FormLabel } from "../../ui/form";
import { useState } from "react";
import { Input } from "../../ui/input";
import CreateTimeForm from "./create-time-form";
import TimeItem from "./time-item";

const RecordTimesSection = () => {
  const [createFormOpened, setCreateFormOpened] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["record-times"],
    queryFn: () => recordTimeService.getAll(),
  });

  return (
    <div className="flex flex-col w-full">
      <h3 className="font-semibold mb-2">Время записи</h3>

      <div className="flex flex-col gap-2">
        {isLoading ? (
          <p className="text-center">Загрузка...</p>
        ) : (
          data?.map((item) => <TimeItem key={item.id} item={item} />)
        )}
      </div>
      {createFormOpened && <CreateTimeForm />}
      <Button
        type="button"
        onClick={() => setCreateFormOpened(!createFormOpened)}
        className="mt-2"
        variant={"outline"}>
        {createFormOpened ? "Скрыть" : "Добавить"}
      </Button>
    </div>
  );
};

export default RecordTimesSection;

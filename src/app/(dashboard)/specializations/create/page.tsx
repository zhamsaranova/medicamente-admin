import PageTitle from "@/components/page-title";
import CreateSpecializationForm from "@/components/specialization-page/create-specialization-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { paths } from "@/lib/routes";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const CreatePage = () => {
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
          <PageTitle>Создание специализации</PageTitle>
        </div>
      </div>
      <Separator className="mb-10" />

      <CreateSpecializationForm />
    </div>
  );
};

export default CreatePage;

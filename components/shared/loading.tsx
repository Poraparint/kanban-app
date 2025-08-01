import { Card, CardHeader } from "@/components/ui/card";
import { Loader } from "lucide-react";

export const Loading = () => {
  return (
    <Card className="justify-center items-center col-span-full shadow-none border-none w-full h-full">
      <CardHeader className="w-full">
        <div className="flex flex-col items-center gap-5">
          <Loader className="h-8 w-8 animate-spin text-primary" />
        </div>
      </CardHeader>
    </Card>
  );
};

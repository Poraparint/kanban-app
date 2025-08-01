"use client";

import { DialogButton } from "@/components/shared";
import { CreateColumnForm } from "@/app/board/[boardId]/components/form";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export const DialogCreateColumn = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DialogButton
        title="Create Column"
        icon={<PlusIcon />}
        dialogTitle="Create New Column"
        dialogDescription="Fill in the form to create a new column"
        className="w-64 flex-shrink-0 text-slate-500 hover:text-slate-700 hover:bg-slate-200 h-full bg-slate-100 border-2 border-dashed border-slate-300"
        open={open}
        setOpen={setOpen}
      >
        <CreateColumnForm setOpen={setOpen} />
      </DialogButton>
    </>
  );
};

"use client";

import { DialogButton } from "@/components/shared";
import { CreateColumnForm } from "@/app/board/[boardId]/components/form";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export const DialogCreateTask = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DialogButton
        title="Add Task"
        icon={<PlusIcon />}
        variant="ghost"
        dialogTitle="Create New Task"
        dialogDescription="Fill in the form to create a new task"
        className="w-full mt-4 border-2 border-dashed border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-500 hover:text-slate-600"
        open={open}
        setOpen={setOpen}
      >
        <CreateColumnForm setOpen={setOpen} />
      </DialogButton>
    </>
  );
};

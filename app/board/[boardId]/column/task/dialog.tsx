"use client";

import { DialogButton } from "@/components/shared";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { CreateTaskForm } from "@/app/board/[boardId]/column/task/form";

interface DialogCreateTaskProps {
  boardId: string;
  columnId: string;
}

export const DialogCreateTask = ({ boardId, columnId }: DialogCreateTaskProps) => {
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
        <CreateTaskForm
          setOpen={setOpen}
          columnId={columnId}
          boardId={boardId}
        />
      </DialogButton>
    </>
  );
};

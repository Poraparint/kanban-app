"use client";

import { DialogButton } from "@/components/shared";
import { CreateBoardForm } from "@/app/board/components/form";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export const DialogCreateBoard = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DialogButton
        title="Create Board"
        icon={<PlusIcon />}
        dialogTitle="Create New Board"
        dialogDescription="Fill in the form to create a new board"
        open={open}
        setOpen={setOpen}
      >
        <CreateBoardForm setOpen={setOpen}  />
      </DialogButton>
    </>
  );
};

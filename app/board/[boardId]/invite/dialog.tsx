"use client";

import { DialogButton } from "@/components/shared";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { InviteMemberForm } from "@/app/board/[boardId]/invite/form";

export const DialogInviteMember = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DialogButton
        title="Invite Member"
        icon={<PlusIcon />}
        dialogTitle="Invite New Member"
        dialogDescription="Fill in the form to invite a new member"
        open={open}
        setOpen={setOpen}
        className="w-50"
      >
        <InviteMemberForm setOpen={setOpen} />
      </DialogButton>
    </>
  );
};

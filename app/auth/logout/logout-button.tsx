"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(async () => {
      await fetch("/api/user/logout", {
        method: "POST",
      });
        router.push("/");
        router.refresh();
    });
  };

  return (
    <Button onClick={onClick}>
      {isPending ? "Logging out..." : children}
    </Button>
  );
};

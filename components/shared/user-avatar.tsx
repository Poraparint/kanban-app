import { useCurrentUser } from "@/hooks/user/use-user";
import { UserRound } from "lucide-react";
import { LogoutButton } from "@/app/auth/logout/logout-button";

export const UserAvatar = () => {
  const user = useCurrentUser();

  if (!user) {
    return (
      <div className="rounded-full p-1 text-slate-700 bg-slate-50 border border-slate-200">
        <UserRound />
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      <div className="rounded-full flex items-center justify-center size-9 text-white bg-primary">
        <UserRound />
      </div>
      <LogoutButton>Logout</LogoutButton>
    </div>
  );
};

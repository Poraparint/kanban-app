"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/user/use-user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const HeroSection = () => {
  const user = useCurrentUser();

  return (
    <div>
      <h1>Welcome to the Kanban App</h1>
      <p>This is a simple Kanban board application built with Next.js.</p>
      <div className="flex gap-3">
        {user ? (
          <Button>
            <Link href={`${DEFAULT_LOGIN_REDIRECT}`}>Access To Board</Link>
          </Button>
        ) : (
          <>
            <Button>
              <Link href="/auth/register">Get Started</Link>
            </Button>
            <Button variant={"outline"}>
              <Link href="/auth/login">Have an account</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

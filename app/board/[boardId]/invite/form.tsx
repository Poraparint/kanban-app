"use client";

import * as z from "zod";

import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

// ui
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/shared";

import { InviteMemberSchema } from "@/schemas";

import { toast } from "sonner";
import { useBoard } from "@/context/context";
import { useRouter } from "next/navigation";

import { inviteMemberAction } from "@/app/actions/invite";

interface InviteMemberFormProps {
  setOpen: (open: boolean) => void;
}

type FoundUser = {
  id: string;
  username?: string | null;
  email: string;
};

export const InviteMemberForm = ({ setOpen }: InviteMemberFormProps) => {
  const { boardId } = useBoard();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [foundUser, setFoundUser] = useState<FoundUser | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const form = useForm<z.infer<typeof InviteMemberSchema>>({
    resolver: zodResolver(InviteMemberSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleFindUser = async () => {
    const email = form.getValues("email");
    const validation = InviteMemberSchema.safeParse({ email });
    if (!validation.success) {
      form.setError("email", { message: "Please enter a valid email address" });
      return;
    }

    setIsSearching(true);
    setFoundUser(null);
    try {
      const res = await fetch(
        `/api/user/email?email=${encodeURIComponent(email)}`
      );
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
        return;
      }
      if (!data.user) {
        toast.error("User not found");
        return;
      }
      setFoundUser({
        id: data.user.id,
        username: data.user.username,
        email: data.user.email,
      });
      toast.success("User found");
    } catch (err) {
      console.error("[FIND_USER]", err);
      toast.error("Something went wrong");
    } finally {
      setIsSearching(false);
    }
  };

  const OnSubmit = () => {
    if (!foundUser) {
      toast.error("Please find user first");
      return;
    }

    startTransition(() => {
      inviteMemberAction({ userId: foundUser.id }, boardId)
        .then((data) => {
          if (data?.error) {
            toast.error(data.error);
          }
          if (data?.success) {
            toast.success(data.success);
            setOpen(false);
            form.reset();
            setFoundUser(null);
            router.refresh();
          }
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(OnSubmit)} className="space-y-4">
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <div className="flex gap-2">
                  <FormControl className="flex-grow">
                    <Input
                      {...field}
                      disabled={isPending || isSearching}
                      placeholder="Enter user's email"
                      type="email"
                    />
                  </FormControl>
                  <Button
                    type="button"
                    onClick={handleFindUser}
                    disabled={isPending || isSearching}
                  >
                    {isSearching ? "Searching..." : "Find"}
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {foundUser && (
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <div>
                <p className="font-medium">{foundUser.username || "No name"}</p>
                <p className="text-sm text-muted-foreground">
                  {foundUser.email}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <SubmitButton
            label="Invite Member"
            isPending={isPending}
            disabled={!foundUser}
          />
        </div>
      </form>
    </Form>
  );
};

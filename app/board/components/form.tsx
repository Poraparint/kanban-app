"use client";

import * as z from "zod";

import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

//ui
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { CreateBoardSchema } from "@/schemas";

import { SubmitButton } from "@/components/shared";
import { toast } from "sonner";
import { createBoardAction } from "@/app/actions/board";
import { useRouter } from "next/navigation";

interface CreateBoardFormProps {
  setOpen: (open: boolean) => void;
}

export const CreateBoardForm = ({
  setOpen
}: CreateBoardFormProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CreateBoardSchema>>({
    resolver: zodResolver(CreateBoardSchema),
    defaultValues: {
      title: "",
    },
  });

  const OnSubmit = (values: z.infer<typeof CreateBoardSchema>) => {
    startTransition(() => {
      createBoardAction(values)
        .then((data) => {
          if (data?.error) {
            toast.error(data.error);
          }
          if (data?.success) {
            toast.success(data.success);
            setOpen(false);
            form.reset();
            router.refresh();
          }
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(OnSubmit)} className="space-y-4">
        <div>
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Board Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Your Board Name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <SubmitButton label="Create New Board" isPending={isPending} />
        </div>
      </form>
    </Form>
  );
};

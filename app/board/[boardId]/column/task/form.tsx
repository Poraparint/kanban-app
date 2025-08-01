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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import { CreateTaskSchema } from "@/schemas";

import { SubmitButton } from "@/components/shared";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createTaskActions } from "@/app/actions/task";
import { useMemberByBoardId } from "@/hooks/board/use-member";

interface CreateTaskFormProps {
  setOpen: (open: boolean) => void;
  columnId: string;
  boardId: string;
}

export const CreateTaskForm = ({
  setOpen,
  columnId,
  boardId,
}: CreateTaskFormProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CreateTaskSchema>>({
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      userId: "",
      columnId,
    },
  });

  const { member: members, isLoading: membersLoading } =
    useMemberByBoardId(boardId);

  const OnSubmit = (values: z.infer<typeof CreateTaskSchema>) => {
    startTransition(() => {
      createTaskActions( {...values}, columnId )
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
                  <FormLabel>Task Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Your Task Name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Description</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Your Task Description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assignee</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={membersLoading || isPending}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            membersLoading ? "Loading..." : "Select member"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {members.map((m) => (
                          <SelectItem key={m.user.id} value={m.user.id}>
                            {m.user.username}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <SubmitButton label="Create New Task" isPending={isPending} />
        </div>
      </form>
    </Form>
  );
};

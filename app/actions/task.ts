"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { CreateTaskSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import z from "zod";

export const createTaskActions = async (
  values: z.infer<typeof CreateTaskSchema>,
  columnId: string
) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const validatedData = CreateTaskSchema.safeParse(values);

  if (!validatedData.success) {
    return {
      error: "Invalid data",
      issues: validatedData.error.issues,
    };
  }

  try {
    const lastColumn = await db.task.findFirst({
      where: {
        columnId,
      },
      orderBy: {
        position: "desc",
      },
    });

    const newPosition = lastColumn ? lastColumn.position + 1 : 1;

    await db.task.create({
      data: {
        title: validatedData.data.title,
        description: validatedData.data.description,
        userId: validatedData.data.userId,
        columnId,
        position: newPosition,
      },
    });

    revalidatePath("/");
    return { success: "Task created successfully" };
  } catch (error) {
    console.error("[CREATE_TASK]", error);
    return {
      error: "Failed to create task",
      description: "Please try again later.",
    };
  }
};

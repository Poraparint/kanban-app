"use server";

import { db } from "@/lib/db";
import { CreateBoardSchema } from "@/schemas";
import { currentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createBoardAction = async (
  values: z.infer<typeof CreateBoardSchema>
) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const validatedData = CreateBoardSchema.safeParse(values);
  if (!validatedData.success) {
    return {
      error: "Invalid data",
      issues: validatedData.error.issues,
    };
  }

  try {
    await db.board.create({
      data: {
        title: validatedData.data.title,
        ownerId: user.id,
      },
    });

    revalidatePath("/");
    return { success: "Board created successfully" };
  } catch (error) {
    console.error("[CREATE_BOARD]", error);
    return {
      error: "Failed to create board",
      description: "Please try again later.",
    };
  }
};

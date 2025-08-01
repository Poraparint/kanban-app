"use server";

import { db } from "@/lib/db";
import { CreateBoardSchema } from "@/schemas";
import { currentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createColumnAction = async (
  values: z.infer<typeof CreateBoardSchema>,
  boardId: string
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
      
    await db.column.create({
      data: {
        title: validatedData.data.title,
        boardId,
        
      },
    });

    revalidatePath("/");
    return { success: "Column created successfully" };
  } catch (error) {
    console.error("[CREATE_COLUMN]", error);
    return {
      error: "Failed to create column",
      description: "Please try again later.",
    };
  }
};

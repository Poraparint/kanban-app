"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export const inviteMemberAction = async (
  values: { userId: string },
  boardId: string
) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const board = await db.board.findUnique({
    where: { id: boardId, ownerId: user.id },
  });

  if (!board) {
    return { error: "Board not found or access denied" };
  }

  if (user.id === values.userId) {
    return { error: "This is your email" };
  }

  try {
    const existingInvitation = await db.boardMember.findFirst({
      where: {
        boardId,
        userId: values.userId,
      },
    });

    if (existingInvitation) {
      return { error: "User is already a member of this board" };
    }

    await db.boardMember.create({
      data: {
        boardId,
        userId: values.userId,
      },
    });

    revalidatePath("/");
    return { success: "Member invited successfully" };
  } catch (error) {
    console.error("[INVITE_MEMBER]", error);
    return {
      error: "Failed to invite member",
      description: "Please try again later.",
    };
  }
};

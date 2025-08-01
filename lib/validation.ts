// lib/validation.ts
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { Board, User } from "@prisma/client";

type ValidateUserResult =
  | { error: string; description?: string }
  | {
      user: User;
      board: Board;
    };

export const validateUser = async (
  boardId: string
): Promise<ValidateUserResult> => {
  if (!boardId) {
    return {
      error: "ID not found",
      description: "You must provide a valid board ID",
    };
  }

  const user = await currentUser();
  if (!user) {
    return {
      error: "Authentication required",
      description: "You must be logged in to access this resource",
    };
  }

  const board = await db.board.findUnique({
    where: { id: boardId, ownerId: user.id },
  });

  if (!board) {
    return { error: "Board not found" };
  }

  return { user, board };
};

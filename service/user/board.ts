import { db } from "@/lib/db";

export const getBoardByUserId = async (
  boardId: string,
  userId: string
) => {
  try {
    const board = await db.board.findUnique({
      where: {
        id: boardId,
        ownerId: userId,
      },
    });
    return board;
  } catch {
    return null;
  }
};

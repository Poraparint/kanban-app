import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { CardNotFound } from "@/components/shared";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const MemberBoardList = async () => {
  const user = await currentUser();

  if (!user) {
    return <CardNotFound message="You are not authorized" />;
  }

  try {
    const boards = await db.boardMember.findMany({
      where: { userId: user.id },
      select: {
          boardId: true,
          board: {
              select: {
                  id: true,
                  title: true
              }
          }
      },
    });

    if (boards.length === 0) {
      return (
        <CardNotFound
          message="No one invited u"
          description="T_T"
        />
      );
    }

    return (
        <div className="space-y-2">
            Board that u has invited
        {boards.map((board) => (
          <div key={board.boardId} className="p-4 border rounded-md">
            <h2 className="text-xl font-semibold">{board.board.title}</h2>
            <Button className="mt-2" asChild>
              <Link href={`${DEFAULT_LOGIN_REDIRECT}/${board.board.id}`}>Access to board</Link>
            </Button>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    console.error("[GET_BOARD]", error);
    return (
      <CardNotFound
        message="Could not fetch boards"
        description="Please try again later."
      />
    );
  }
};

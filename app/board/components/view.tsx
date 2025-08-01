import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { CardNotFound } from "@/components/shared";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const BoardList = async () => {
  const user = await currentUser();

  if (!user) {
    return <CardNotFound message="You are not authorized" />;
  }

  try {
    const boards = await db.board.findMany({
      where: { ownerId: user.id },
      select: {
        id: true,
        title: true,
      },
    });

    if (boards.length === 0) {
      return (
        <CardNotFound
          message="Welcome to the Kanban App"
          description="Get started by creating your first board."
        />
      );
    }

    return (
      <div className="space-y-2">
        {boards.map((board) => (
          <div key={board.id} className="p-4 border rounded-md">
            <h2 className="text-xl font-semibold">{board.title}</h2>
            <Button className="mt-2" asChild>
              <Link href={`${DEFAULT_LOGIN_REDIRECT}/${board.id}`}>Access to board</Link>
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

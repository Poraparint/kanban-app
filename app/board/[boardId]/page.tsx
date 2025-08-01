import { BoardProvider } from "@/context/provider";
import { Card, CardContent } from "@/components/ui/card";
import { DialogCreateColumn } from "@/app/board/[boardId]/components/dialog";
import { ColumnList } from "@/app/board/[boardId]/column/view";
import { DialogInviteMember } from "@/app/board/[boardId]/invite/dialog";
import { CardNotFound } from "@/components/shared";
import { validateUser } from "@/lib/validation";
import { db } from "@/lib/db";

const BoardManagePage = async ({ params }: { params: { boardId: string } }) => {
  const { boardId } = await params;

  const validation = await validateUser(boardId);

  if (validation instanceof Response) {
    return <CardNotFound message="You are not authorized" />;
  }

  const users = await db.boardMember.findMany({
    where: { boardId },
    select: {
      id: true,
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });

  return (
    <BoardProvider boardId={boardId}>
      <Card className="mb-4 flex-row justify-between">
        <DialogInviteMember />
        <CardContent>
          {users.map((user) => (
            <div key={user.id}>{user.user.username}</div>
          ))}
        </CardContent>
      </Card>
      <Card className="flex-row bg-slate-50">
        <div className="flex gap-6 overflow-x-auto pb-6">
          <DialogCreateColumn />
          <ColumnList boardId={boardId} />
        </div>
      </Card>
    </BoardProvider>
  );
};

export default BoardManagePage;

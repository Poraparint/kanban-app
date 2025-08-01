import { BoardProvider } from "@/context/provider";
import { Card } from "@/components/ui/card";
import { DialogCreateColumn } from "@/app/board/[boardId]/components/dialog";
import { ColumnList } from "@/app/board/[boardId]/column/view";
import { DialogInviteMember } from "@/app/board/[boardId]/invite/dialog";

const BoardManagePage = async ({ params }: { params: { boardId: string } }) => {
  const { boardId } = await params;

  return (
    <BoardProvider boardId={boardId}>
      <Card className="mb-4">
        <DialogInviteMember />
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

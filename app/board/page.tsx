import { Card } from "@/components/ui/card";
import { DialogCreateBoard } from "@/app/board/components/dialog";
import { BoardList } from "@/app/board/components/view";

const BoardPage = () => {
  return (
    <Card>
      <DialogCreateBoard />
      <BoardList />
    </Card>
  );
};

export default BoardPage;

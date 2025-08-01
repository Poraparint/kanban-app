import { Card } from "@/components/ui/card";
import { DialogCreateBoard } from "@/app/board/components/dialog";
import { BoardList } from "@/app/board/components/view";
import { MemberBoardList } from "./components/memberview";

const BoardPage = () => {
  return (
    <Card>
      <DialogCreateBoard />
      <BoardList />
      <MemberBoardList/>
    </Card>
  );
};

export default BoardPage;

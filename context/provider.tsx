
"use client";
import { ReactNode } from "react";
import { BoardContext } from "@/context/context";

export const BoardProvider = ({
  boardId,
  children,
}: {
  boardId: string;
  children: ReactNode;
}) => {
  return (
    <BoardContext.Provider value={{ boardId }}>
      {children}
    </BoardContext.Provider>
  );
};


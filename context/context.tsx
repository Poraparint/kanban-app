import { createContext, useContext } from "react";

export const BoardContext = createContext<{ boardId: string } | undefined>(
  undefined
);

export const useBoard = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error("useBoard must be used within a BoardProvider");
  }
  return context;
};


import { TriangleAlert } from "lucide-react";

export const ErrorCard = () => {
  return (
    <div
    >
      <p>Oops! Something went wrong</p>
      <TriangleAlert className="text-destructive-foreground" />
    </div>
  );
};

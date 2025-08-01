import { db } from "@/lib/db";
import { validateUser } from "@/lib/validation";
import { CardNotFound } from "@/components/shared";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DialogCreateTask } from "@/app/board/[boardId]/column/task/dialog";

interface ColumnListProps {
  boardId: string;
}

export const ColumnList = async ({ boardId }: ColumnListProps) => {
  const validation = await validateUser(boardId);

  if (validation instanceof Response) {
    return <CardNotFound message="You are not authorized" />;
  }

  try {
    const columns = await db.column.findMany({
      where: { boardId },
      select: {
        id: true,
        title: true,
        tasks: {
          select: {
            id: true,
            title: true,
            description: true,
            user: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
      },
    });

    if (columns.length === 0) {
      return (
        <CardNotFound
          message="Information not found"
          description="Get started by creating a column"
        />
      );
    }

    return (
      <>
        {columns.map((column) => (
          <div key={column.id} className="flex-shrink-0 w-80">
            <Card className="h-full bg-white shadow-sm border-slate-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-sm font-semibold text-slate-700">
                      {column.title}
                    </CardTitle>
                    <Badge
                      variant="secondary"
                      className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5"
                    >
                      {column.tasks?.length || 0}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="min-h-[400px] space-y-3">
                  {column.tasks?.map((task, index) => (
                    <Card
                      key={task.id || index}
                      className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <CardContent className="p-4">
                        <h4 className="font-medium text-slate-800 mb-2">
                          {task.title || `Task ${index + 1}`}
                        </h4>
                        {task.description && (
                          <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                            {task.description}
                          </p>
                        )}
                        <div className="flex items-center justify-between">
                          {task.user.username && (
                            <div className="w-6 h-6 bg-slate-300 rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium text-slate-700">
                                {task.user.username.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )) || (
                    <div className="text-center py-8 text-slate-400">
                      <p className="text-sm">No tasks yet</p>
                    </div>
                  )}
                </div>

                <DialogCreateTask />
              </CardContent>
            </Card>
          </div>
        ))}
      </>
    );
  } catch (error) {
    console.error("[COLUMNS_GET]", error);
    return (
      <CardNotFound
        message="Could not fetch columns"
        description="Please contact support"
      />
    );
  }
};

import { Card, CardContent } from "@/components/ui/card";

type Task = {
  id: string;
  title: string;
  description?: string | null;
  user: {
    username: string ;
  } ;
};

type ColumnWithTasks = {
  tasks?: Task[];
};

interface TaskListProps {
  column: ColumnWithTasks;
}

export const TaskList = ({ column }: TaskListProps) => {
  return (
    <div className="space-y-3">
      {column.tasks?.map((task, index) => (
        <Card key={task.id || index} className="">
          <CardContent className="flex flex-row justify-between">
            <div>
              <h4 className="font-medium text-slate-800 mb-2">
                {task.title || `Task ${index + 1}`}
              </h4>
              {task.description && (
                <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                  {task.description}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              {task.user.username && (
                <div className="p-2 bg-slate-300 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-slate-700">
                    {task.user.username}
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
  );
};
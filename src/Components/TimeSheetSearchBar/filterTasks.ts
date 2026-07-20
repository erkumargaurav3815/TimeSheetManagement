import type { Task } from "../types";

export const filterTasks = (tasks: Task[], search: string) => {
  if (!search.trim()) return tasks;

  const query = search.toLowerCase();

  return tasks.filter((task) =>
    [task.name, task.category].join(" ").toLowerCase().includes(query),
  );
};

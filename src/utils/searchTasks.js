export const searchTasks = (tasks, searchTerm) => {
  if (!searchTerm) return tasks;

  const query = searchTerm.toLowerCase();

  return tasks.filter((task) =>
    [task.title, task.assignee, task.process]
      .join(" ")
      .toLowerCase()
      .includes(query),
  );
};
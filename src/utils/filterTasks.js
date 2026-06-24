export const filterTasks = (tasks, filters) => {
  return tasks.filter((task) =>
    Object.entries(filters).every(([key, values]) => {
      if (!values.length) return true;
      return values.includes(task[key]);
    }),
  );
};
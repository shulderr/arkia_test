export const sortTasks = (tasks, sortOrder) => {
  return [...tasks].sort((a, b) => {
    const firstDate = new Date(a.createdAt);
    const secondDate = new Date(b.createdAt);

    return sortOrder === "asc"
      ? firstDate - secondDate
      : secondDate - firstDate;
  });
};
import { useMemo } from "react";
import { useTaskStore } from "../store/useTaskStore";
import { searchTasks } from "../utils/searchTasks";
import { filterTasks } from "../utils/filterTasks";
import { sortTasks } from "../utils/sortTasks";

export const useFilteredTasks = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const searchTerm = useTaskStore((state) => state.searchTerm);
  const filters = useTaskStore((state) => state.filters);
  const order = useTaskStore((state) => state.sortOrder);

  return useMemo(() => {
    const searched = searchTasks(tasks, searchTerm);
    const filtered = filterTasks(searched, filters);
    const sorted = sortTasks(filtered, order);
    return sorted;
  }, [tasks, searchTerm, filters, order]);
};
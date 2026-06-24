import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getTasks } from "../services/taskService";

export const useTaskStore = create(
  persist(
    (set) => ({
      tasks: [],
      loading: false,
      error: null,

      searchTerm: "",

      filters: {
        status: null,
        priority: null,
        process: null,
      },

      sortOrder: "desc",

      selectedTask: null,

      loadTasks: async () => {
        try {
          set({
            loading: true,
            error: null,
          });
          const tasks = await getTasks();
          set({
            tasks,
            loading: false,
          });
        } catch (error) {
          set({
            error: error.message,
            loading: false,
          });
        }
      },

      setSearchTerm: (searchTerm) => {
        set({
          searchTerm,
        });
      },

      setFilters: (filters) => {
        set({
          filters,
        });
      },

      setSortOrder: (sortOrder) => {
        set({
          sortOrder,
        });
      },

      setSelectedTask: (task) => {
        set({
          selectedTask: task,
        });
      },
    }),
    {
      name: "arkia-task-filters",
      partialize: (state) => ({
        searchTerm: state.searchTerm,
        filters: state.filters,
        sortOrder: state.sortOrder,
      }),
    },
  ),
);

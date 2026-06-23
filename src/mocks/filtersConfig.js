export const filtersConfig = [
  {
    key: "status",
    label: "Status",
    type: "multiple",
    options: [
      { value: "pending", label: "Pending" },
      { value: "in_progress", label: "In progress" },
      { value: "completed", label: "Completed" },
    ],
  },
  {
    key: "priority",
    label: "Priority",
    type: "multiple",
    options: [
      { value: "high", label: "High" },
      { value: "medium", label: "Medium" },
      { value: "low", label: "Low" },
    ],
  },
  {
    key: "process",
    label: "Process",
    type: "multiple",
    options: [
      { value: "Finance", label: "Finance" },
      { value: "Human Resources", label: "Human Resources" },
      { value: "IT", label: "IT" },
      { value: "Procurement", label: "Procurement" },
    ],
  },
];

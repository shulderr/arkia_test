import { describe, it, expect } from "vitest";
import { filterTasks } from "./filterTasks";

const tasks = [
  { id: "1", status: "pending", priority: "high", process: "IT" },
  { id: "2", status: "completed", priority: "low", process: "Finance" },
  { id: "3", status: "pending", priority: "low", process: "IT" },
];

describe("filterTasks", () => {
  it("returns all tasks when no filters are active", () => {
    const result = filterTasks(tasks, { status: [], priority: [], process: [] });
    expect(result).toHaveLength(3);
  });

  it("filters by a single criterion", () => {
    const result = filterTasks(tasks, { status: ["pending"], priority: [], process: [] });
    expect(result.map((t) => t.id)).toEqual(["1", "3"]);
  });

  it("applies multiple filters as AND (all must match)", () => {
    const result = filterTasks(tasks, { status: ["pending"], priority: ["low"], process: [] });
    expect(result.map((t) => t.id)).toEqual(["3"]);
  });

  it("matches any value within the same criterion (OR)", () => {
    const result = filterTasks(tasks, { status: ["pending", "completed"], priority: [], process: [] });
    expect(result).toHaveLength(3);
  });
});
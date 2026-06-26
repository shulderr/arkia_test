import { describe, it, expect } from "vitest";
import { searchTasks } from "./searchTasks";

const tasks = [
  { id: "1", title: "Review contract", description: "legal terms", assignee: "Ana Gomez", process: "Procurement" },
  { id: "2", title: "Database migration", description: "maintenance window", assignee: "Diego Torres", process: "IT" },
];

describe("searchTasks", () => {
  it("returns all tasks when search term is empty", () => {
    expect(searchTasks(tasks, "")).toHaveLength(2);
  });

  it("matches by title (case-insensitive)", () => {
    const result = searchTasks(tasks, "DATABASE");
    expect(result.map((t) => t.id)).toEqual(["2"]);
  });

  it("matches across multiple fields (assignee)", () => {
    const result = searchTasks(tasks, "ana");
    expect(result.map((t) => t.id)).toEqual(["1"]);
  });

  it("returns empty array when nothing matches", () => {
    expect(searchTasks(tasks, "xyz")).toEqual([]);
  });
});
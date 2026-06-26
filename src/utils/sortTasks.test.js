import { describe, it, expect } from "vitest";
import { sortTasks } from "./sortTasks";

const tasks = [
  { id: "1", createdAt: "2026-05-01T10:00:00Z" },
  { id: "2", createdAt: "2026-05-10T10:00:00Z" },
  { id: "3", createdAt: "2026-05-05T10:00:00Z" },
];

describe("sortTasks", () => {
  it("sorts by createdAt descending (newest first)", () => {
    const result = sortTasks(tasks, "desc");
    expect(result.map((t) => t.id)).toEqual(["2", "3", "1"]);
  });

  it("sorts by createdAt ascending (oldest first)", () => {
    const result = sortTasks(tasks, "asc");
    expect(result.map((t) => t.id)).toEqual(["1", "3", "2"]);
  });

  it("does not mutate the original array", () => {
    const original = [...tasks];
    sortTasks(tasks, "asc");
    expect(tasks).toEqual(original);
  });
});
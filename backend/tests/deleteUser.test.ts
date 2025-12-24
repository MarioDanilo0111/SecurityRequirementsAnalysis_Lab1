import { describe, it, expect, beforeEach } from "vitest";
import { deleteUser, getUsers } from "../src/services/userService.js";

beforeEach(() => {
  const seed = [
    { id: 1, name: "George", email: "george@vitest.com", role: "user" },
    { id: 2, name: "John", email: "john@vitest.com", role: "admin" },
  ];
  const users = getUsers();
  users.length = 0;
  seed.forEach((u) => users.push(u));
});

describe("deleteUser()", () => {
  it("delete a user by id and return the deleted user", () => {
    const deleted = deleteUser(1);

    if (deleted !== false) {
      expect(deleted.id).toBe(1);
    } else {
      throw new Error("Expected delete to be return a user, but got falese");
    }

    expect(deleted).toBeDefined();
    expect(getUsers().length).toBe(1);
  });

  it("returns false if user does not exist", () => {
    const response = deleteUser(999);
    expect(response).toBe(false);
  });

  it("removes exactly one user", () => {
    const before = getUsers().length;
    deleteUser(2);
    const after = getUsers().length;

    expect(after).toBe(before - 1);
  });
});

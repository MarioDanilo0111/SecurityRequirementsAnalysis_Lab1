import { describe, it, expect, beforeEach } from "vitest";
import { updateUser, getUsers } from "../src/services/userService.js";

// Reset before each test
beforeEach(() => {
  const seed = [
    { id: 1, name: "Jeshu", email: "jeshu@vitest.com", role: "user" },
    { id: 2, name: "Mak", email: "mak@vitest.com", role: "admin" },
  ];

  const users = getUsers();
  users.length = 0;
  seed.forEach((u) => users.push(u));
});

describe("updateUsers()", () => {
  it("updates user field correctly", () => {
    const updated = updateUser(1, { name: "NewName", role: "editor" });

    if (updated === null) throw new Error("Expected user to be updated");

    expect(updated.name).toBe("NewName");
    expect(updated.role).toBe("editor");
    expect(updated.email).toBe("jeshu@vitest.com");
  });

  it("returns null if user does not exist", () => {
    const result = updateUser(999, { name: "Ghost" });
    expect(result).toBeNull();
  });

  it("updates only provided fields", () => {
    const before = getUsers()[0];

    const updated = updateUser(1, { role: "super-admin" });
    if (updated === null) throw new Error("Expected update to succeed");

    expect(updated.role).toBe("super-admin");
    expect(updated.name).toBe(before.name);
    expect(updated.email).toBe(before.email);
  });
});

import { describe, it, expect, beforeEach } from "vitest";
import {
  updateUser,
  getUsers,
  addUser,
  _resetUsers,
} from "../src/services/userService.js";

// Reset before each test
beforeEach(() => {
  _resetUsers([
    { id: 1, name: "Jeshu", email: "jeshu@vitest.com", role: "user" },
    { id: 2, name: "Mak", email: "mak@vitest.com", role: "admin" },
  ]);
});

describe("updateUsers()", () => {
  it("updates user field correctly", () => {
    const updated = updateUser(1, { name: "NewName", role: "editor" });

    if (updated === null) throw new Error("Expected user to be updated");

    expect(updated.name).toBe("NewName");
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

  it("should ignore ID override attempts", () => {
    const original = addUser("ignoreOverride", "ignore@vitest.com", "user");

    const updated = updateUser(original.id, {
      id: 999,
      name: "Hacked Name",
    });

    expect(updated).not.toBeNull();
    expect(updated!.id).toBe(original.id);
    expect(updated!.name).toBe("Hacked Name");
  });
});

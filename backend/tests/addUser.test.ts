import { describe, it, expect, beforeEach } from "vitest";
import { addUser, getUsers, _resetUsers } from "../src/services/userService.js";

// Restet state before each test (import!)
beforeEach(() => {
  // Manually reset users array by pushing seed data again
  // (We need to re-import or recreate state each time)
  _resetUsers([
    { id: 1, name: "Carlos", email: "carlos@vitest.com", role: "user" },
    { id: 2, name: "Kath", email: "kath@vitest.com", role: "admin" },
  ]);
});

describe("addUser()", () => {
  it("add a new user and return it", () => {
    const newUser = addUser("Maria", "maria@vitest.com", "editor");

    expect(newUser).toBeDefined();
    expect(newUser.name).toBe("Maria");
    expect(newUser.email).toBe("maria@vitest.com");
    expect(newUser.role).toBe("editor");
  });

  it("increments the user id correctly", () => {
    const usersBefore = getUsers().length;
    const newUser = addUser("Paul", "paul@vitest.com", "guest");

    expect(newUser.id).toBe(usersBefore + 1);
  });

  it("increments user array length by 1", () => {
    const before = getUsers().length;
    addUser("Elisabeth", "elisabeth@vitest.com", "admin");
    const after = getUsers().length;

    expect(after).toBe(before + 1);
  });

  it("should reject invalid email", () => {
    expect(() => addUser("Danilo", "not-an-email", "user")).toThrow();
  });

  it("should reject empty name", () => {
    expect(() => addUser("", "noName@vitest.com", "user")).toThrow();
  });
});

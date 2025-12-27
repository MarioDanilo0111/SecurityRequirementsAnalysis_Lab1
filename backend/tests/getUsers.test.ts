import { describe, it, expect } from "vitest";
import { getUsers } from "../src/services/userService.js";

describe("getUsers()", () => {
  it("returns an array", () => {
    const users = getUsers();
    expect(Array.isArray(users)).toBe(true);
  });

  it("users have required field", () => {
    const users = getUsers();
    expect(users[0]).toHaveProperty("id");
    expect(users[0]).toHaveProperty("name");
    expect(users[0]).toHaveProperty("email");
    expect(users[0]).toHaveProperty("role");
  });

  it("Should return a copy of the users array", () => {
    const users1 = getUsers();
    const users2 = getUsers();

    users1.push({
      id: 999,
      name: "Anne",
      email: "anny@vitest.com",
      role: "user",
    });

    expect(users2.length).not.toBe(users1.length);
  });
});

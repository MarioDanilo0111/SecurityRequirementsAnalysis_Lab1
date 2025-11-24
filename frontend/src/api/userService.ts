import type { User } from "../types/userTypes.ts";
import userJson from "../data/users.json";

let users: User[] = userJson as User[];

export function getUsers(): User[] {
  return users;
}

export function addUser(name: string, email: string): User {
  const newUser: User = {
    id: Date.now(),
    name,
    email,
  };
  users.push(newUser);

  return newUser;
}

export function deleteUser(id: number): void {
  users = users.filter((u) => u.id !== id);
}

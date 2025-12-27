import { User } from "../types/user";

const users: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com", role: "user" },
  { id: 2, name: "Bob", email: "bob@example.com", role: "admin" },
];

/* Get Users */
export function getUsers(): User[] {
  return users;
}

/* Add User, POST*/
export function addUser(name: string, email: string, role: string): User {
  const newUser: User = {
    id: users.length + 1,
    name,
    email,
    role,
  };
  users.push(newUser);
  return newUser;
}

/* Delete User */
export function deleteUser(id: number): User | false {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return false;

  const [deletedUser] = users.splice(index, 1);
  return deletedUser;
}

/* Update User (PUT = replace, PATCH = partial update) */
export function updateUser(id: number, data: Partial<User>): User | null {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return null;

  // Prevent ID overrider in PATCH
  const { id: _, ...safeData } = data;

  users[index] = { ...users[index], ...safeData };

  return users[index];
}

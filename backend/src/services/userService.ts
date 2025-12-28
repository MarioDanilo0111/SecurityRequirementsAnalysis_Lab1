import { User } from "../types/user";

const users: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com", role: "user" },
  { id: 2, name: "Bob", email: "bob@example.com", role: "admin" },
];

/* Get Users */
export function getUsers(): User[] {
  return [...users];
}

/* Add User, POST*/
export function addUser(name: string, email: string, role: string) {
  if (!name || !name.trim()) {
    throw new Error("Name cannot be empty");
  }

  // Simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }

  const newUser: User = {
    id: users.length + 1,
    name: name.trim(),
    email: email.trim(),
    role: role.trim(),
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
  const { id: _ignored, ...updated } = data;

  users[index] = {
    ...users[index],
    ...updated,
  };

  return users[index];
}
/* To emty the array for testing*/
export function _resetUsers(newData: User[]) {
  users.length = 0;
  newData.forEach((u) => users.push(u));
}

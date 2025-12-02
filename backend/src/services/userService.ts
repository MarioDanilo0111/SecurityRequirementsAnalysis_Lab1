import { User } from "../types/user.js";

let users: User[] = [];
/* Get Users */
export function getUsers() {
  return users;
}
/* Add User */
export function addUser(name: string, email: string): User {
  if (!users) {
    return;
  }
  const generateNewUser: User = {
    id: users.length + 1,
    name,
    email,
  };
  users.push(generateNewUser);
  return generateNewUser;
}
/* Delete User */
export function deleteUser(id: number): User | false {
  if (!users || users.length === 0) return false;
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return false;

  const [deletedUser] = users.splice(index, 1);
  return deletedUser;
}

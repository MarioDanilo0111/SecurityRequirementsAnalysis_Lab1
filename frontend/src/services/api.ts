const BASE_URL = "http://localhost:3000/users";

export async function fetchUsers() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export async function createUser(name: string, email: string, role: string) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, role }),
  });
  if (!res.ok) {
    throw new Error("Failed to create user");
    return res.json();
  }
}

export async function deleteUserById(id: number) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });

  if (!res.ok && res.status !== 204) {
    throw new Error(`Failed to delete user with id=${id}`);
  }
  return true;
}

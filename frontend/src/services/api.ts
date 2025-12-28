const BASE_URL = "http://localhost:3000/users";

export async function fetchUsers() {
  try {
    const res = await fetch(BASE_URL);

    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    return await res.json();
  } catch (err) {
    const msg = document.querySelector("#error-message");
    if (msg instanceof HTMLElement) {
      msg.textContent = "Backend error — could not load users.";
      msg.style.display = "block";
    }

    console.error("Fetch users failed:", err);
    return [];
  }
}

export async function createUser(name: string, email: string, role: string) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, role }),
  });
  if (!res.ok) {
    throw new Error(`Failed to create user (${res.status})`);
  }
  const data = await res.json();

  if (!data.id) {
    console.error("Invalid POST response: ", data);
    throw new Error("Backend did not return an id");
  }

  return data;
}

export async function deleteUserById(id: number) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });

  if (!(res.ok || res.status === 204)) {
    throw new Error(`Failed to delete user with id=${id}`);
  }
  return true;
}

const BASE_URL = "http://localhost:3000/users";

export async function fetchUsers() {
  try {
    const res = await fetch(BASE_URL);

    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    return await res.json();
  } catch (err) {
    // ✔ Required for Playwright Test #5
    const msg = document.querySelector("#error-message");
    if (msg instanceof HTMLElement) {
      msg.textContent = "Backend error — could not load users.";
      msg.style.display = "block";
    }

    console.error("Fetch users failed:", err);
    return []; // FE still works with empty list
  }
}

export async function createUser(name: string, email: string, role: string) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, role }),
  });
  if (!res.ok) {
    throw new Error("Failed to create user");
  }
  return await res.json();
}

export async function deleteUserById(id: number) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });

  if (!(res.ok || res.status === 204)) {
    throw new Error(`Failed to delete user with id=${id}`);
  }
  return true;
}

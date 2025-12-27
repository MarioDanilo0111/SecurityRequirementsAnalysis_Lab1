import { fetchUsers, deleteUserById, createUser } from "./services/api";
import type { User } from "./types/userTypes.js";

export async function startApp() {
  document.querySelector("#app")!.innerHTML = `
  <h1>Simple CRUD App</h1>
  <div id="error-message" style="color:red; display:none;"></div>
  <div id="form-section"></div>
  <ul id="user-list"></ul>
  `;
  renderForm();
  setupFormEvent();

  // async to await the render list so that the tests can pass
  await renderList();
}

export function renderForm() {
  console.log("renderForm runinig...");
  const formSection = document.querySelector("#form-section");
  if (!formSection) {
    console.log("Form section not Found");
    return;
  }

  formSection.innerHTML = `
  <form id="user-form">

    <input type="text" id="name-input" placeholder="Name" />
    <input type="email" id="email-input" placeholder="Email" />   

    <select id="role-input">
      <option value="user">user</option>
      <option value="admin">admin</option>
    </select>

    <button type="submit" id="submit-btn">add</button>   
  </form>
  `;
}

export function setupFormEvent() {
  const formSection = document.querySelector<HTMLFormElement>("#user-form");
  if (!formSection) {
    console.log("Form Section list not found");
    return;
  }
  formSection.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nameInput =
      formSection.querySelector<HTMLInputElement>("#name-input");
    const emailInput =
      formSection.querySelector<HTMLInputElement>("#email-input");
    const roleInput =
      formSection.querySelector<HTMLInputElement>("#role-input");
    if (!nameInput || !emailInput || !roleInput) {
      console.log("Input not found");
      return;
    }

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const role = roleInput.value.trim();
    if (!name || !email || !role) {
      console.log("Name, email or role missing, pleas fill in them all");
      return;
    }
    try {
      await createUser(name, email, role);
      console.log(
        `Submited new user with name: ${name}, email: ${email}, role: ${role}`
      );
      formSection.reset();
      /* Update the UI */
      await renderList();
    } catch (err) {
      console.error("Failed to create user: ", err);
      const errorBox = document.querySelector("#error-message") as HTMLElement;
      errorBox.textContent = "Backend is unavailable";
      errorBox.style.display = "block";
      alert("Could not create user. Check console.");
    }
  });
}
export async function renderList() {
  const usersEl = document.querySelector<HTMLUListElement>("#user-list");
  if (!usersEl) return;

  // Clean old items
  usersEl.innerHTML = "";
  // Fetch from Backend
  const users: User[] = await fetchUsers();

  users.forEach((u) => {
    const li = document.createElement("li");
    li.dataset.id = String(u.id);
    li.textContent = `${u.name} <${u.email}> (${u.role})`;

    const btn = document.createElement("button");
    btn.textContent = "Delete";
    btn.dataset.id = String(u.id);
    // console.log(btn);

    li.appendChild(btn);
    usersEl.appendChild(li);
  });
  setupDeleteEvents();
}

export function setupDeleteEvents() {
  const btns = document.querySelectorAll<HTMLButtonElement>("button[data-id]");

  if (btns.length === 0) {
    console.warn("No Button");
    return;
  }

  btns.forEach((b) => {
    b.addEventListener("click", async () => {
      const btnsId = Number(b.dataset.id);

      if (isNaN(btnsId) || btnsId <= 0) {
        console.error("Invalid id on delete button", b.dataset.id);
        return;
      }

      if (!confirm("Are you sure you want to delete this user?")) return;
      try {
        await deleteUserById(btnsId);
        console.log(`Deleted user with id ${btnsId}`);
        await renderList();
      } catch (err) {
        console.error("Delete failed: ", err);
        alert("Could not delete user. Check console.");
      }
    });
  });
}

import { addUser, getUsers, deleteUser } from "./api/userService";
// import {renderList} from "./renderList"
export function startApp() {
  document.querySelector("#app")!.innerHTML = `
  <h1>Simple CRUD App</h1>
  <div id="form-section"></div>
  <ul id="user-list"></ul>
  `;
  renderForm();
  setupFormEvent();
  renderList();
  setupDeleteEvents();
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
      <button type="submit" id="">add</button>   
    </form>
  `;
}

export function setupFormEvent() {
  const formSection = document.querySelector<HTMLFormElement>("#user-form");
  if (!formSection) {
    console.log("Form Section list not found");
    return;
  }

  const nameInput = document.querySelector<HTMLInputElement>("#name-input");
  const emailInput = document.querySelector<HTMLInputElement>("#email-input");
  if (!nameInput || !emailInput) {
    console.log("Input not found");
    return;
  }

  formSection.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    if (!name || !email) {
      console.log("Name or email missing");
      return;
    }
    console.log("Submited: ", { name, email });
    addUser(name, email);
    formSection.reset();
    /* Update the UI */
    renderList();
    setupDeleteEvents();
  });
}
export function renderList() {
  const usersEl = document.querySelector<HTMLUListElement>("#user-list");
  if (!usersEl) {
    console.warn("could not load Users: ");
    return;
  }
  usersEl.innerHTML = "";
  const list = getUsers();
  list.forEach((u) => {
    const li = document.createElement("li");
    li.textContent = `${u.name} <${u.email}> `;

    const btn = document.createElement("button");
    btn.textContent = "Delete";
    btn.dataset.id = u.id.toString();
    console.log(btn);

    li.appendChild(btn);
    usersEl.appendChild(li);
  });
}

export function setupDeleteEvents() {
  const btns = document.querySelectorAll<HTMLButtonElement>("button[data-id]");
  console.log(btns);
  if (btns.length === 0) {
    console.warn("No Button");
    return;
  }
  btns.forEach((b) => {
    const btnsId = b.dataset.id;
    if (!btnsId) return;
    const id = Number(btnsId);
    b.addEventListener("click", () => {
      deleteUser(id);
      renderList();
      setupDeleteEvents();
    });
  });
}

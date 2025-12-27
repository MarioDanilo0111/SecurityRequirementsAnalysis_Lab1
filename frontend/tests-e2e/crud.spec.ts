import { test, expect } from "@playwright/test";

//const FRONTEND_URL = "http://127.0.0.1:5173";

test("1. Frontend load and show heading", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveText(/CRUD/i);
});

test("2. Users are loaded and rendered", async ({ page }) => {
  await page.goto("/");

  const items = page.locator("#user-list li");
  const count = await items.count();

  expect(count).toBeGreaterThan(0);
});

test("3. Can create a new user", async ({ page }) => {
  await page.goto("/");

  await page.fill("#name-input", "TestUser");
  await page.fill("#email-input", "test@user.com");
  await page.selectOption("#role-input", "user");

  await page.click("#submit-btn");

  const newUser = page.locator("#user-list li", { hasText: "TestUser" });
  await expect(newUser).toBeVisible();
});

test("4. Can delete a user", async ({ page }) => {
  await page.goto("/");

  const firstDeleteBtn = page.locator("button[data-id]").first();
  const id = await firstDeleteBtn.getAttribute("data-id");

  // handle dialog before click
  page.once("dialog", (dialog) => dialog.accept());

  await firstDeleteBtn.click();

  const deletedUser = page.locator(`#user-list li[data-id="${id}"]`);
  await expect(deletedUser).toHaveCount(0);
});

test("5. Show error if backend is down", async ({ page }) => {
  await page.route("**/users", (route) =>
    route.fulfill({ status: 500, body: "Server error" })
  );

  await page.goto("/");

  const msg = page.locator("#error-message");
  await expect(msg).toBeVisible();
});

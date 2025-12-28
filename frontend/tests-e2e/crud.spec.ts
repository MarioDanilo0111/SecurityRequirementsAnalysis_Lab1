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

  await page.waitForSelector(`#user-list li:has-text("TestUser")`);
});

test("4. Can delete a user", async ({ page }) => {
  await page.goto("/");

  const firstUser = page.locator("#user-list li").first();

  await expect(firstUser).toHaveAttribute("data-id", /\d+/);
  const id = await firstUser.getAttribute("data-id");

  page.once("dialog", (dialog) => dialog.accept());

  await firstUser.locator("button").click();

  await expect(page.locator(`#user-list li[data-id="${id}"]`)).toHaveCount(0);
});

test("5. Show error if backend is down", async ({ page }) => {
  await page.route("**/users", (route) =>
    route.fulfill({ status: 500, body: "Server error" })
  );

  await page.goto("/");

  const msg = page.locator("#error-message");
  await expect(msg).toBeVisible();
});

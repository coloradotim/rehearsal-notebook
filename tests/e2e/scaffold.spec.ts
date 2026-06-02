import { expect, test } from "@playwright/test";

test("home page presents the scaffold shell", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Rehearsal Notebook" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Plan, run, and review rehearsals without losing the musical thread.",
    }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Login" })).toHaveAttribute(
    "href",
    "/login",
  );
});

test("login route stays a placeholder for later auth work", async ({
  page,
}) => {
  await page.goto("/login");

  await expect(
    page.getByRole("heading", { name: "Private access" }),
  ).toBeVisible();
  await expect(page.getByText("Login placeholder")).toBeVisible();
  await expect(
    page.getByText(
      "Username and password authentication will be added with Supabase in a later issue.",
    ),
  ).toBeVisible();
});

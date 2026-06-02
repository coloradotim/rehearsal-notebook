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
    "/login?next=/planning",
  );
});

test("login route presents email and password sign-in", async ({ page }) => {
  await page.goto("/login");

  await expect(
    page.getByRole("heading", { name: "Private access" }),
  ).toBeVisible();
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel("Password")).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign in" })).toBeVisible();
  await expect(page.getByText("Sign up")).toHaveCount(0);
  await expect(page.getByText("magic link")).toHaveCount(0);
  await expect(page.getByText("OTP")).toHaveCount(0);
  await expect(page.getByText("Google")).toHaveCount(0);
});

test("protected route handles missing Supabase configuration", async ({
  page,
}) => {
  await page.goto("/planning");

  await expect(
    page.getByRole("heading", { name: "Supabase configuration needed" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Go to login" })).toHaveAttribute(
    "href",
    "/login",
  );
});

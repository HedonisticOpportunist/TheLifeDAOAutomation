import { expect, test } from "@playwright/test";
import { login, verifyLoginPage } from "../helpers/testHelpers";

test.describe("LOGIN-RELATED TESTS", () => {
  test.beforeEach(async ({ page }) => {
    await verifyLoginPage(page);
  });

  test("a user cannot login without inputting a valid email", async ({
    page,
  }) => {
    await login(page, "x", "password", true);
  });

  test("a user cannot login without a valid password and email", async ({
    page,
  }) => {
    // Test passes, but the functionality is not what you would expect in this scenario. View the README.md file.
    await login(page, "test@gmail.com", "password", false);
  });

  test("a user with an existing credentials can login", async ({ page }) => {
    await login(page, "fujitahibaraki.gmail.com", "bengD2bD3zZSwnW!123", true);
    await expect(page.getByText("Welcome back to The LifeDAO")).toBeVisible();
  });
});

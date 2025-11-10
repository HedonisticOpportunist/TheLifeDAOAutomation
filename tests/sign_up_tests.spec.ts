import { test } from "@playwright/test";
import {
  enterSignUpCode,
  signUp,
  joinWaitingList,
  verifyUATPage,
} from "../helpers/testHelpers";

test.describe("SIGN-UP-RELATED TESTS", () => {
  test.beforeEach(async ({ page }) => {
    await verifyUATPage(page);
  });

  test("a user cannot sign up using an invalid invite code", async ({
    page,
  }) => {
    await enterSignUpCode(page, "123", true, false);
  });

  test("a user cannot sign up without inputting an invite code", async ({
    page,
  }) => {
    await enterSignUpCode(page, "", false, true);
  });

  test("a user cannot sign up for the waiting list without an email", async ({
    page,
  }) => {
    await joinWaitingList(page, "", true, false, false, true);
  });

  test("a user cannot sign up for the waiting list with an invalid email", async ({
    page,
  }) => {
    await joinWaitingList(page, "test", false, true, false, true);
  });

  test.skip("a user cannot sign up for the waiting list if they are already a member", async ({
    page,
  }) => {
    await joinWaitingList(page, "test@email.com", false, false, true, false); // Not working at the moment.
  });

  test("a user cannot complete the signup without providing a valid email", async ({
    page,
  }) => {
    await enterSignUpCode(page, "AFypw5", false, false);
    await signUp(page, "test", "password123!", true, false, false);
  });

  test("a user cannot complete the signup without providing a password with special characters", async ({
    page,
  }) => {
    await enterSignUpCode(page, "AFypw5", false, false);
    await signUp(page, "test@email.com", "password", false, true, false);
  });

  test("a user cannot complete the signup without providing a password with special characters or an email", async ({
    page,
  }) => {
    await enterSignUpCode(page, "AFypw5", false, false);
    await signUp(page, "test", "password", true, true, false);
  });

  test.skip("a user can complete the signup by providing valid details", async ({
    page,
  }) => {
    /* Running this will invalidate the sign-up code. 
    // A good solution for automated testing would involve creating a list of throwaway codes
    that would allow for this to be run multiple times.
    */
    await enterSignUpCode(page, "AFypw5", false, false);
    await signUp(page, "email@email.com", "password123!", false, false, true);
  });
});

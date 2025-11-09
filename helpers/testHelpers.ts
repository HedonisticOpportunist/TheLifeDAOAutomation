import { expect } from "@playwright/test";
import { UAT_URL, LOGIN_URL } from "./constants";

// UAT VERIFICATION-RELATED FUNCTIONS //

export async function verifyUATPage(page: any) {
  // ARRANGE - ACT
  await page.goto(UAT_URL);

  // ASSERT
  await expect(page).toHaveTitle("The LifeDAO");
  await expect(
    page.getByRole("heading", {
      name: "Be empowered in your financial journey",
    })
  ).toBeVisible();
}

// SIGN UP-RELATED FUNCTIONS //

export async function enterSignUpCode(
  page: any,
  activationCode: string,
  invalid_code: boolean,
  no_code: boolean
) {
  // ARRANGE
  await page.getByRole("button", { name: "Join via Invite" }).click();

  // ACT
  await page.getByPlaceholder("Invite code/link").fill(activationCode);
  await page.getByRole("button", { name: "Submit" }).click();

  // ASSERT
  verifySignUpCodeFields(page, invalid_code, no_code);
}

export async function signUp(
  page: any,
  email: string,
  password: string,
  invalid_email: boolean,
  no_special_characters: boolean,
  valid_details: boolean
) {
  // ARRANGE - ACT
  await page.getByPlaceholder("Enter your email").fill(email);
  await page.getByPlaceholder("Enter your password").fill(password);
  await page.getByPlaceholder("Repeat Password").fill(password);

  // ASSERT
  verifySignUp(page, invalid_email, no_special_characters, valid_details);
}

export async function joinWaitingList(
  page: any,
  email: string,
  no_input: boolean,
  invalid_email: boolean,
  valid_details: boolean,
  not_already_a_member: boolean
) {
  // ARRANGE
  await page.goto(UAT_URL + "#join-waitlist");

  // ACT
  await page.getByPlaceholder("olivia@untitledui.com").fill(email);

  // ASSERT
  verifyJoinWaitingList(
    page,
    no_input,
    invalid_email,
    valid_details,
    not_already_a_member
  );
}

// LOGIN-RELATED FUNCTIONS //

export async function verifyLoginPage(page: any) {
  // ARRANGE - ACT
  await page.goto(LOGIN_URL);

  // ASSERT
  await expect(page).toHaveTitle("The LifeDAO");
  await expect(page.getByText("Welcome back to The LifeDAO")).toBeVisible();
}

export async function login(
  page: any,
  email: string,
  password: string,
  invalid_email: boolean
) {
  // ARRANGE - ACT
  await page.getByPlaceholder("Enter your email").fill(email);
  await page.getByPlaceholder("Enter your password").fill(password);

  // ASSERT
  handleLogin(page, invalid_email);
}

//VERIFICATION-RELATED HELPER FUNCTIONS //

async function verifySignUpCodeFields(
  page: any,
  invalid_code: boolean,
  no_code: boolean
) {
  if (invalid_code) {
    await expect(page.getByText("Invite code is invalid")).toBeVisible();
  }

  if (no_code) {
    await expect(
      page.getByText("Please enter invite code/link.")
    ).toBeVisible();
  }
}

async function verifyIfUserAlreadyOnList(
  page: any,
  not_already_a_member: boolean
) {
  await page.getByRole("button", { name: "Join Waitlist" }).nth(1).click();

  if (not_already_a_member) {
    await expect(
      page.getByText(
        "Thank you for joining the waitlist. We'll be in touch soon!"
      )
    ).toBeVisible();
  } else {
    await expect(
      page.getByText("You’ve already joined the waitlist.")
    ).toBeVisible();
  }
}

async function handleLogin(page: any, invalid_email: boolean) {
  if (invalid_email) {
    await expect(page.getByText("Please enter valid email.")).toBeVisible();
  } else {
    await page.getByRole("button", { name: "Log In" }).nth(1).click();
  }
}

async function verifySignUp(
  page: any,
  invalid_email: boolean,
  no_special_characters: boolean,
  valid_details: boolean
) {
  if (invalid_email) {
    await expect(
      page.getByText("Please enter a valid email address.")
    ).toBeVisible();
  }

  if (no_special_characters) {
    page.getByText("Password must contain at least one special character."); // only one edge case considered, although there are others.
  }

  if (valid_details) {
    await page.getByRole("button", { name: "Sign Up" }).click();
  }
}

async function verifyJoinWaitingList(
  page: any,
  no_input: boolean,
  invalid_email: boolean,
  valid_details: boolean,
  not_already_a_member: boolean
) {
  if (no_input) {
    await expect(page.getByText("Please enter your email.")).toBeVisible();
  }

  if (invalid_email) {
    await expect(
      page.getByText("Please enter a valid email address.")
    ).toBeVisible();
  }

  if (valid_details) {
    verifyIfUserAlreadyOnList(page, not_already_a_member);
  }
}

## Running the Tests

Run the tests using the following command to see the Playwright GUI:

`npx playwright test --ui`

Otherwise, run the command:

`npx playwright test`

The tests only run in Chrome, and the `fullyParallel` option is set to `false`. This is to ensure that tests run smoothly, given the limited amount of frames allotted to this project.

## Bugs

#### Entering Invalid Credentials into the Login Forms Does Not Cause An Error Message to Show Up:

Steps:

- Navigate to the Login Page.
- Enter a valid email, such as 'test@email.com', and a password, such as 'password123', into the relevant input fields. What is important is that neither of these fields should be matched to an existing user.
- Click on the 'Log in' button.
`![Steps](/[images/invalid_input.jpg](https://github.com/HedonisticOpportunist/TheLifeDAOAutomation/blob/main/images/invalid_input.jpg))`

Expected Result:

- An error message should appear, alerting the user that they do not have an account or similar.

Actual Result:

- The screen informs the user that they should validate their email (see screenshot).

`![Actual Result](/images/verify_email_page.png)`

#### Overlapping Layout

##### Steps:

- Navigate to the Landing Page.
- With the mouse button, scroll down until you hit the end of the page.

##### Expected Result:

- The transparent header placed on the header should not overlap with any UI images.

##### Actual Result:

- An overlap is visible (see screenshot).

`![Overlap](/images/overlapping_layout.jpg)`




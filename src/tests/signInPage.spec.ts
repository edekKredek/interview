import { test, expect } from '@playwright/test';
import { SignInPage } from '../pageObjectModels/signInPage';
import { signInUrl } from '../test-data/url';
import { signInUsers } from '../test-data/signInUsers';

test.beforeEach(async ({ page }) => {

  //When - Navigate to the login page
  await page.goto(signInUrl);

  //Then - Assert that the login page is displayed
  await expect(
    page.getByRole('heading', { name: 'Test login' })
  ).toBeVisible();
});

test.describe('Login Page Tests', () => {

  test('TC01 Login with valid credentials', async ({ page }) => {

    const signInPage = new SignInPage(page);

    //When
    //Provide valid credentials
    await signInPage.signIn(
      signInUsers.valid.username,
      signInUsers.valid.password,
    );

    //Then
    // Assert that the logged in successfully header is visible
    await signInPage.assertLoggedInSuccessfullyHeaderVisible();
    // Assert that Log Out button is visible on the site after login
    await signInPage.assertLogOutButton();
    // Assert that the URL is the sign up confirmation page
    await signInPage.assertSignUpConfirmUrl();
  });

  test('TC02 Login with no password', async ({ page }) => {

    const signInPage = new SignInPage(page);

    //When
    //Provide only email, no password
    await signInPage.signIn(
      signInUsers.noPassword.username,
      signInUsers.noPassword.password,
    );

    //Then
    // Assert that the URL is not the sign up confirmation page
    await signInPage.assertNotSignUpConfirmUrl();
    // Assert that the error message 'Your password is invalid!' is visible
    await signInPage.assertInvalidPasswordErrorVisible
  });

  test('TC03 Login with no username', async ({ page }) => {

    const signInPage = new SignInPage(page);

    //When
    //Provide only password, no email
    await signInPage.signIn(
      signInUsers.noEmail.username,
      signInUsers.noEmail.password,
    );

    //Then
    // Assert that the URL is not the sign up confirmation page
    await signInPage.assertNotSignUpConfirmUrl();
    //Assert that the error message 'Your username is invalid!' is visible
    await signInPage.assertInvalidUsernameErrorVisible();
  });

  test('TC04 Login with no username and no password', async ({ page }) => {

    const signInPage = new SignInPage(page);

    //When
    //Do not provide username or password
    await signInPage.signIn('', '');

    //Then
    // Assert that the URL is not the sign up confirmation page
    await signInPage.assertNotSignUpConfirmUrl();
    // Assert that the error message 'Your username is invalid!' is visible
    await signInPage.assertInvalidUsernameErrorVisible();
  });

  test('TC05 Login with blank/whitespace username and password', async ({ page }) => {

    const signInPage = new SignInPage(page);

    //When
    //Provide blank/whitespace username and password
    await signInPage.signIn(
      signInUsers.blank.username,
      signInUsers.blank.password,
    );

    //Then
    // Assert that the URL is not the sign up confirmation page
    await signInPage.assertNotSignUpConfirmUrl();
    // Assert that the error message 'Your username is invalid!' is visible
    await signInPage.assertInvalidUsernameErrorVisible();
  });

  test('TC06 Login with invalid username format', async ({ page }) => {

    const signInPage = new SignInPage(page);

    //When
    //Provide invalid username format (missing letters after @)
    await signInPage.signIn(
      signInUsers.invalidUsername.username,
      signInUsers.invalidUsername.password,
    );

    //Then
    // Assert that the URL is not the sign up confirmation page
    await signInPage.assertNotSignUpConfirmUrl();
    // Assert that the error message 'Your username is invalid!' is visible
    await signInPage.assertInvalidUsernameErrorVisible();
  });

  test('TC07 Login with username containing leading/trailing spaces', async ({ page }) => {

    const signInPage = new SignInPage(page);

    //When
    //Provide valid credentials with username having leading/trailing spaces
    await signInPage.signIn(
      signInUsers.userWithSpaces.username,
      signInUsers.userWithSpaces.password,
    );

    //Then
    // Assert that the URL is not the sign up confirmation page
    await signInPage.assertNotSignUpConfirmUrl();
    // Assert that the error message 'Your username is invalid!' is visible
    await signInPage.assertInvalidUsernameErrorVisible();
  });

  test('TC08 Login with user case sensitivity (Uppercase)', async ({ page }) => {

    const signInPage = new SignInPage(page);

    //When
    //Provide valid credentials with username in uppercase
    await signInPage.signIn(
      signInUsers.userUppercase.username,
      signInUsers.userUppercase.password,
    );

    //Then
    // Assert that the URL is not the sign up confirmation page
    await signInPage.assertNotSignUpConfirmUrl();
    // Assert that the error message 'Your username is invalid!' is visible
    await signInPage.assertInvalidUsernameErrorVisible();
  });

  test('TC09 Login with SQL injection attempt', async ({ page }) => {

    const signInPage = new SignInPage(page);

    //When
    //Provide SQL injection payload in username field
    await signInPage.signIn(
      signInUsers.sqlInjection.username,
      signInUsers.sqlInjection.password,
    );

    //Then
    // Assert that the URL is not the sign up confirmation page
    await signInPage.assertNotSignUpConfirmUrl();
    // Assert that the error message 'Your username is invalid!' is visible
    await signInPage.assertInvalidUsernameErrorVisible();
  });

  test('TC10 Login with SQL injection attempt using @', async ({ page }) => {

    const signInPage = new SignInPage(page);

    //When
    //Provide SQL injection payload with @ in username field
    await signInPage.signIn(
      signInUsers.sqlInjectionWithAt.username,
      signInUsers.sqlInjectionWithAt.password,
    );

    //Then
    // Assert that the URL is not the sign up confirmation page
    await signInPage.assertNotSignUpConfirmUrl();
    // Assert that the error message 'Your username is invalid!' is visible
    await signInPage.assertInvalidUsernameErrorVisible();
  });

  test('TC11 Log Out', async ({ page }) => {

    const signInPage = new SignInPage(page);

    //When
    //Provide valid credentials
    await signInPage.signIn(
      signInUsers.valid.username,
      signInUsers.valid.password,
    );

    //Click Log Out button
    await page.getByRole('link', { name: 'Log out' }).click();

    //Then
    // Assert that the URL is the sign in page
    await expect(page).toHaveURL(signInUrl);
    // Assert that Test Login header is visible again
    await signInPage.assertTestLoginHeaderIsVisible();
  });
});

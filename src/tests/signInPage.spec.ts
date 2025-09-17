import { test, expect } from '@playwright/test';
import { SignInPage } from '../pageObjectModels/signInPage';
import { signInUrl } from '../test-data/url';
import { signInUsers } from '../test-data/signInUsers';
import { describe } from 'node:test';

test.beforeEach(async ({ page }) => {
  await page.goto(signInUrl);
});

test.describe('Login Page Tests', () => {

  test('TC01 Login with valid credentials', async ({ page }) => {

    const signInPage = new SignInPage(page);

    //When
    //Provide valid credentials
    await signInPage.signIn(
      signInUsers.valid.email,
      signInUsers.valid.password,
    );

    //Then
    // Assert that 'John Doe' is visible on the site after login
    await signInPage.assertUserButtonInViewport('John Doe');
    // Assert that the URL is the dashboard
    await signInPage.assertDashboardUrl();
  });

  test('TC02 Login with no password', async ({ page }) => {

    const signInPage = new SignInPage(page);

    //When
    //Provide only email, no password
    await signInPage.signIn(
      signInUsers.noPassword.email,
      signInUsers.noPassword.password,
    );

    //Then
    // Assert that the URL is not the dashboard
    await signInPage.assertNotDashboardUrl();
  });

  test('TC03 Login with no email', async ({ page }) => {

    const signInPage = new SignInPage(page);
    
    //When
    //Provide only password, no email
    await signInPage.signIn(
      signInUsers.noEmail.email,
      signInUsers.noEmail.password,
    );

    //Then
    // Assert that the URL is not the dashboard
    await signInPage.assertNotDashboardUrl();
  });

  test('TC04 Login with no email and no password', async ({ page }) => {

    const signInPage = new SignInPage(page);

    //When
    //Do not provide email or password
    await signInPage.signIn('', '');

    //Then
    // Assert that the URL is not the dashboard
    await signInPage.assertNotDashboardUrl();
  });

  test('TC05 Login with blank/whitespace email and password', async ({ page}) => {

    const signInPage = new SignInPage(page);

    //When
    //Provide blank/whitespace email and password
    await signInPage.signIn(
      signInUsers.blank.email,
      signInUsers.blank.password,
    );

    //Then
    // Assert that the URL is not the dashboard
    await signInPage.assertNotDashboardUrl();
  });

  test('TC06 Login with invalid email format', async ({ page }) => {

    const signInPage = new SignInPage(page);

    //When
    //Provide invalid email format (missing letters after @)
    await signInPage.signIn(
      signInUsers.invalidEmail.email,
      signInUsers.invalidEmail.password,
    );

    //Then
    // Assert that the error message 'Invalid email format' is visible
    await signInPage.assertInvalidEmailFormatError();
    // Assert that the URL is not the dashboard
    await signInPage.assertNotDashboardUrl();
  });

  test('TC07 Login with email containing leading/trailing spaces', async ({ page }) => {

    const signInPage = new SignInPage(page);

    //When
    //Provide valid credentials with email having leading/trailing spaces
    await signInPage.signIn(
      signInUsers.emailWithSpaces.email,
      signInUsers.emailWithSpaces.password,
    );

    //Then
    // Assert that 'John Doe' is visible on the site after login
    await signInPage.assertUserButtonInViewport('John Doe');
    // Assert that the URL is the dashboard
    await signInPage.assertDashboardUrl();
  });

  test('TC08 Login with email case sensitivity (lowercase)', async ({ page}) => {

    const signInPage = new SignInPage(page);

    //When
    //Provide valid credentials with email in lowercase
    await signInPage.signIn(
      signInUsers.emailLowercase.email,
      signInUsers.emailLowercase.password,
    );

    //Then
    // Assert that 'John Doe' is visible on the site after login
    await signInPage.assertUserButtonInViewport('John Doe');
    // Assert that the URL is the dashboard
    await signInPage.assertDashboardUrl();
  });

  test('TC09 Login with SQL injection attempt', async ({ page }) => {

    const signInPage = new SignInPage(page);

    //When
    //Provide SQL injection payload in email field
    await signInPage.signIn(
      signInUsers.sqlInjection.email,
      signInUsers.sqlInjection.password,
    );

    //Then
    // Assert that the URL is not the dashboard (injection should fail)
    await signInPage.assertNotDashboardUrl();
  });

  test('TC10 Login with SQL injection attempt using @', async ({ page }) => {

    const signInPage = new SignInPage(page);

    //When
    //Provide SQL injection payload with @ in email field
    await signInPage.signIn(
      signInUsers.sqlInjectionWithAt.email,
      signInUsers.sqlInjectionWithAt.password,
    );
    
    //Then
    // Assert that the URL is not the dashboard (injection should fail)
    await signInPage.assertNotDashboardUrl();
  });
});

import { test } from '@playwright/test';
import { signUpUrl } from '../test-data/url';
import { SignUpPage } from '../pageObjectModels/signUpPage';
import { signInUsers } from '../test-data/signUpUsers';

test.beforeEach(async ({ page }) => {
  await page.goto(signUpUrl);
});

test.describe('Sign Up Page Tests', () => {
    
  test('TC01 Sign Up with valid credentials', async ({ page }) => {

    const signUpPage = new SignUpPage(page);

    //When
    //Provide valid data
    await signUpPage.signUp(
      signInUsers.valid.displayName,
      signInUsers.valid.email,
      signInUsers.valid.password,
      signInUsers.valid.repeatPassword,
    );

    //Then
    //Assert that the URL is the sign-up confirmation page
    await signUpPage.assertConfirmUrl();
    await signUpPage.almostReadyMessage();
  });

  test('TC02 Sign Up with already registered email', async ({ page }) => {

    const signUpPage = new SignUpPage(page);

    //When
    //Provide data with already registered email
    await signUpPage.signUp(
      signInUsers.existingEmail.displayName,
      signInUsers.existingEmail.email,
      signInUsers.existingEmail.password,
      signInUsers.existingEmail.repeatPassword,
    );

    //Then
    //Assert email already registered error
    await signUpPage.emailAlreadyRegisteredError();
  });

  test('TC03 Sign Up with invalid email format', async ({ page }) => {

    const signUpPage = new SignUpPage(page);

    //When
    //Provide data with invalid email format
    await signUpPage.signUp(
      signInUsers.invalidEmail.displayName,
      signInUsers.invalidEmail.email,
      signInUsers.invalidEmail.password,
      signInUsers.invalidEmail.repeatPassword,
    );

    //Then
    //Assert invalid email format error
    await signUpPage.invalidEmailFormatError();
  });

  test('TC04 Sign Up with forbidden password word', async ({ page }) => {

    const signUpPage = new SignUpPage(page);

    //When
    //Provide data with password containing forbidden word
    await signUpPage.signUp(
      signInUsers.forbiddenPassword.displayName,
      signInUsers.forbiddenPassword.email,
      signInUsers.forbiddenPassword.password,
      signInUsers.forbiddenPassword.repeatPassword,
    );

    //Then
    //Assert forbidden password word error
    await signUpPage.forbiddenPasswordWordError();
  });

  test('TC05 Sign Up with mismatched passwords', async ({ page }) => {

    const signUpPage = new SignUpPage(page);

    //When
    //Provide data with mismatched passwords
    await signUpPage.signUp(
      signInUsers.confirmationMismatch.displayName,
      signInUsers.confirmationMismatch.email,
      signInUsers.confirmationMismatch.password,
      signInUsers.confirmationMismatch.repeatPassword,
    );

    //Then
    //Assert password mismatch error
    await signUpPage.passwordAndConfirmationError();
  });

  test('TC06 Sign Up with password too short', async ({ page }) => {

    const signUpPage = new SignUpPage(page);

    //When
    //Provide data with password shorter than 6 characters
    await signUpPage.signUp(
      signInUsers.toShortPassword.displayName,
      signInUsers.toShortPassword.email,
      signInUsers.toShortPassword.password,
      signInUsers.toShortPassword.repeatPassword,
    );

    //Then
    //Assert password too short error
    await signUpPage.passwordTooShortError();
  });

  test('TC07 Sign Up with password no uppercase', async ({ page }) => {

    const signUpPage = new SignUpPage(page);

    //When
    //Provide data with password containing no uppercase letter
    await signUpPage.signUp(
      signInUsers.noUppercasePassword.displayName,
      signInUsers.noUppercasePassword.email,
      signInUsers.noUppercasePassword.password,
      signInUsers.noUppercasePassword.repeatPassword,
    );

    //Then
    //Assert password no uppercase error
    await signUpPage.passwordNoUppercaseError();
  });

  test('TC08 Sign Up with password no digit', async ({ page }) => {

    const signUpPage = new SignUpPage(page);

    //When
    //Provide data with password containing no digit
    await signUpPage.signUp(
      signInUsers.noDigitPassword.displayName,
      signInUsers.noDigitPassword.email,
      signInUsers.noDigitPassword.password,
      signInUsers.noDigitPassword.repeatPassword,
    );

    //Then
    //Assert password no digit error
    await signUpPage.passwordNoDigitError();
  });

  test('TC09 Sign Up with password no special character', async ({ page }) => {

    const signUpPage = new SignUpPage(page);

    //When
    //Provide data with password containing no special character
    await signUpPage.signUp(
      signInUsers.noSpecialCharPassword.displayName,
      signInUsers.noSpecialCharPassword.email,
      signInUsers.noSpecialCharPassword.password,
      signInUsers.noSpecialCharPassword.repeatPassword,
    );

    //Then
    //Assert password no special character error
    await signUpPage.passwordNoSpecialCharError();
  });

  test('TC10 Sign Up with display name too short', async ({ page }) => {

    const signUpPage = new SignUpPage(page);

    //When
    //Provide data with display name shorter than 2 characters
    await signUpPage.signUp(
      signInUsers.toShortDisplayName.displayName,
      signInUsers.toShortDisplayName.email,
      signInUsers.toShortDisplayName.password,
      signInUsers.toShortDisplayName.repeatPassword,
    );

    //Then
    //Assert display name error
    await signUpPage.displayNameError();
  });
});

import { Page, Locator, expect } from '@playwright/test';
import { dashboardUrl, signInUrl, signUpConfirmUrl } from '../test-data/url';

export class SignUpPage {
  private page: Page;
  private displaynameInput: Locator;
  private emailInput: Locator;
  private passwordInput: Locator;
  private repeatPasswordInput: Locator;
  private createAccountButton: Locator;
  private signUpWithGitHubButton: Locator;
  private alreadyHaveAccountLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.displaynameInput = page.getByTestId('signup-display-name-input');
    this.emailInput = page.getByTestId('signup-email-input');
    this.passwordInput = page.getByTestId('signup-password-input');
    this.repeatPasswordInput = page.getByTestId('signup-confirm-password-input');
    this.createAccountButton = page.getByTestId('signup-submit-button');
    this.signUpWithGitHubButton = page.getByTestId('signup-github-auth');
    this.alreadyHaveAccountLink = page.getByTestId('signup-signin-link');
  }

  async provideDisplayName(displayName: string) {
    await this.displaynameInput.fill(displayName);
  }

  async provideEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async providePassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async provideRepeatPassword(repeatPassword: string) {
    await this.repeatPasswordInput.fill(repeatPassword);
  }

  async clickSignUpButton() {
    await this.createAccountButton.click();
  }

  async clickSignUpWithGitHubButton() {
    await this.signUpWithGitHubButton.click();
  }

  async clickAlreadyHaveAccountLink() {
    await this.alreadyHaveAccountLink.click();
  }

  async signUp(
    displayName: string,
    email: string,
    password: string,
    repeatPassword: string,
  ) {
    await this.provideDisplayName(displayName);
    await this.provideEmail(email);
    await this.providePassword(password);
    await this.provideRepeatPassword(repeatPassword);
    await this.clickSignUpButton();
  }

  //Assertions

  async emailAlreadyRegisteredError() {
    await expect(
      this.page.getByText('Email is already registered'),
    ).toBeVisible();
  }

  async invalidEmailFormatError() {
    await expect(this.page.getByText('Invalid email format')).toBeVisible();
  }

  async forbiddenPasswordWordError() {
    await expect(
      this.page.getByText("Password should not contain the word 'password'"),
    ).toBeVisible();
  }

  async passwordAndConfirmationError() {
    await expect(
      this.page.getByText('Password and confirmation password do not match'),
    ).toBeVisible();
  }

  async passwordTooShortError() {
    await expect(
      this.page.getByText('Password must be at least 6 characters long'),
    ).toBeVisible();
  }

  async passwordNoUppercaseError() {
    await expect(
      this.page.getByText(
        'Password must contain at least one uppercase letter',
      ),
    ).toBeVisible();
  }

  async passwordNoDigitError() {
    await expect(
      this.page.getByText('Password must contain at least one digit'),
    ).toBeVisible();
  }

  async passwordNoSpecialCharError() {
    await expect(
      this.page.getByText(
        'Password must contain at least one special character (@$!%*?&)',
      ),
    ).toBeVisible();
  }

  async displayNameError() {
    await expect(
      this.page.getByText('Display name must be at least 2 characters long'),
    ).toBeVisible();
  }

  async almostReadyMessage() {
    await expect(this.page.getByText('Almost ready!')).toBeVisible();
  }

  async assertConfirmUrl() {
    await expect(this.page).toHaveURL(signUpConfirmUrl);
  }
}

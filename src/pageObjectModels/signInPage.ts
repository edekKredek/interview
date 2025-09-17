import { Page, Locator, expect } from '@playwright/test';
import { dashboardUrl, signInUrl } from '../test-data/url';

export class SignInPage {
  private page: Page;
  private emailInput: Locator;
  private passwordInput: Locator;
  //private signInButtonMainPage: Locator;
  private signInButtonLoginPage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByTestId('signin-email-input');
    this.passwordInput = page.getByTestId('signin-password-input');
    //this.signInButtonMainPage = page.getByRole('link', { name: 'Sign In' });
    this.signInButtonLoginPage = page.getByTestId('signin-submit-button');
  }

  async provideEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async providePassword(password: string) {
    await this.passwordInput.fill(password);
  }

  // async clickSignInButtonMainPage() {
  //   await this.signInButtonMainPage.click();
  // }

  async clickSignInButtonLoginPage() {
    await this.signInButtonLoginPage.click();
  }

  async signIn(email: string, password: string) {
    await this.provideEmail(email);
    await this.providePassword(password);
    await this.clickSignInButtonLoginPage();
  }

  //Assertions

  async assertUserButtonInViewport(userName: string) {
    await expect(
      this.page.getByRole('button', { name: userName }),
    ).toBeInViewport();
  }

  async assertUserButtonNotInViewport(userName: string) {
    await expect(
      this.page.getByRole('button', { name: userName }),
    ).toBeDisabled();
  }

  async assertDashboardUrl() {
    await expect(this.page).toHaveURL(dashboardUrl);
  }

  async assertNotDashboardUrl() {
    await expect(this.page).not.toHaveURL(dashboardUrl);
  }

  async assertInvalidEmailFormatError() {
    await expect(this.page.getByText('Invalid email format')).toBeVisible();
  }
}

import { Page, Locator, expect } from '@playwright/test';
import { signUpConfirmUrl } from '../test-data/url';

export class SignInPage {
  private page: Page;
  private userInput: Locator;
  private passwordInput: Locator;
  private signInButtonLoginPage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.signInButtonLoginPage = page.getByRole('button', { name: 'Submit' });
  }

  async provideUser(username: string) {
    await this.userInput.fill(username);
  }

  async providePassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickSignInButtonLoginPage() {
    await this.signInButtonLoginPage.click();
  }

  async signIn(username: string, password: string) {
    await this.provideUser(username);
    await this.providePassword(password);
    await this.clickSignInButtonLoginPage();
  }

  //Assertions

  async assertTestLoginHeaderIsVisible() {
    await expect(
      this.page.getByRole('heading', { name: 'Test login' })
    ).toBeVisible();
  }

  async assertLogOutButton() {
    await expect(
      this.page.getByRole('link', { name: 'Log out' }),
    ).toBeInViewport();
  }

  async assertSignUpConfirmUrl() {
    await expect(this.page).toHaveURL(signUpConfirmUrl);
  }

  async assertNotSignUpConfirmUrl() {
    await expect(this.page).not.toHaveURL(signUpConfirmUrl);
  }

  async assertInvalidUsernameErrorVisible() {
    const errorDiv = this.page.locator('div#error.show');
    await expect(errorDiv).toBeVisible();
    await expect(errorDiv).toHaveText('Your username is invalid!');
  }

  async assertInvalidPasswordErrorVisible() {
    const errorDiv = this.page.locator('div#error.show');
    await expect(errorDiv).toBeVisible();
    await expect(errorDiv).toHaveText('Your password is invalid!');
  }

  async assertLoggedInSuccessfullyHeaderVisible() {
    const header = this.page.locator('h1.post-title');
    await expect(header).toBeVisible();
    await expect(header).toHaveText('Logged In Successfully');
  }
}

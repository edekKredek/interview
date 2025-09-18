import { test, expect } from '@playwright/test';




test.describe('Notepad', () => {

  test('TC01 Notepad', async ({ page }) => {

    await page.goto('https://anotepad.com/');
  });
});
import { test } from '@playwright/test';
import { AutomationTestingPracticePage } from '../pageObjectModels/automationTestingPracticePage';

test.only('Color', async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/');

    const automationTestingPracticePagePlaywright = new AutomationTestingPracticePage(page);

    const myColor = automationTestingPracticePagePlaywright.selectRandomColorFromDropdown();

    await page.getByPlaceholder('Enter Name').fill(await myColor);
});


import { test } from '@playwright/test';
import { AutomationTestingPracticePagePlaywright } from '../pageObjectModels/automationTestingPracticePagePlaywright';

test.only('Color', async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/');

    const automationTestingPracticePagePlaywright = new AutomationTestingPracticePagePlaywright(page);

    const myColor = automationTestingPracticePagePlaywright.selectRandomColorFromDropdown();

    await page.getByPlaceholder('Enter Name').fill(await myColor);
});


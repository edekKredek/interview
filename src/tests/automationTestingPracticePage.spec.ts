import { test } from '@playwright/test';
import { AutomationTestingPracticePage } from '../pageObjectModels/automationTestingPracticePage';

test.only('Color', async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/');
    const automationTestingPracticePage = new AutomationTestingPracticePage(page);

    const myColor = automationTestingPracticePage.myColor ?? '';

    await page.getByPlaceholder('Enter Name').fill(myColor);

    await page.getByPlaceholder('Wywal sie').fill(myColor);
});


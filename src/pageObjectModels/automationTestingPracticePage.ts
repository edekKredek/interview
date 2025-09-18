import { Page, Locator, expect } from '@playwright/test';

export class AutomationTestingPracticePage {
    private page: Page;
    private colorsDropdown: Locator;
    public selectedColor: string | null = null;

    constructor(page: Page) {
        this.page = page;
        this.colorsDropdown = page.locator('#colors');
    }

    async selectRandomColorFromDropdown(): Promise<string> {
        // Get all option values from the dropdown
        const options = await this.colorsDropdown.locator('option').all();
        const colorsArray: string[] = [];

        for (const option of options) {
            const value = await option.getAttribute('value');
            if (value && value.trim() !== '') {
                colorsArray.push(value);
            }
        }

        if (colorsArray.length === 0) {
            throw new Error('No color options found in dropdown');
        }

        // Select a random color
        const randomColor = colorsArray[Math.floor(Math.random() * colorsArray.length)];
        
        // Select the color in the dropdown
        await this.colorsDropdown.selectOption(randomColor);
        
        this.selectedColor = randomColor;
        return randomColor;
    }

}
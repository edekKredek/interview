import { Page, expect } from '@playwright/test';

export class AutomationTestingPracticePage {
    private page: Page;
    public myColor: string | null = null;


    constructor(page: Page) {
        this.page = page;
        this.myColor = String(this.selectRandomColorFromArray());

    }

    async selectRandomColorFromArray() {

        const dropdown = document.getElementById('colors') as HTMLSelectElement | null;

        if (!dropdown) {

            console.log('Dropdown not found');
            return { allColors: [], randomColor: null };
        }

        const colorsArray = [];

            for (const option of dropdown.options) {
    
                if (option.value) {
    
                    colorsArray.push(option.value);
                }
            }

       const randomColor = colorsArray[Math.floor(Math.random() * colorsArray.length)];

       return randomColor;
    }

};
import { BasePage } from './BasePage.js';
import { expect } from '@playwright/test';

export class CartPage extends BasePage {
    constructor(page) {
        super(page);
        this.itemName = page.locator('.inventory_item_name');
        this.itemPrice = page.locator('.inventory_item_price');
        this.checkoutButton = page.locator('#checkout');
    }
    
    async verifyItem(expectedName, expectedPrice) {
        const actualName = await this.itemName.textContent();
        const actualPrice = await this.itemPrice.textContent();
        
        expect(actualName).toBe(expectedName);
        expect(actualPrice).toBe(expectedPrice);
    }
    
    async goToCheckout() {
        await this.checkoutButton.click();
    }
}
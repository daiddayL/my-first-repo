import { BasePage } from './BasePage.js';

export class InventoryPage extends BasePage {
    constructor(page) {
        super(page);

        this.sortSpan = page.locator('.product_sort_container');
        this.shoppingCart = page.locator('.shopping_cart_link');
        this.pageTitle = page.locator('.title')

        this.firstItem = page.locator('[data-test="inventory-item"]').first();
        this.firstItemName = this.firstItem.locator('[data-test="inventory-item-name"]');
        this.firstItemPrice = this.firstItem.locator('[data-test="inventory-item-price"]');
        this.firstItemButton = this.firstItem.locator('button');
        
    }
    //option value will be 'hilo'
    async sortItems(option) {
        await this.sortSpan.selectOption(option);
    }
    async addItemToCart() {
        const name = await this.firstItemName.textContent();
        const price = await this.firstItemPrice.textContent();
        
        await this.click(this.firstItemButton);
        return { name, price };
    }
    async openCart(){
        await this.click(this.shoppingCart);
    }
    async GetPageTitle(){
        return await this.pageTitle.textContent();
    }
}
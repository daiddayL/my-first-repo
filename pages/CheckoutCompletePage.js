import { BasePage } from './BasePage.js';

export class CheckoutCompletePage extends BasePage {
    constructor(page) {
        super(page);
        
        this.completionMessage = page.locator('.complete-header');
    }
    
    async getCompletionMessage(){
        return await this.completionMessage.textContent();
    }
}
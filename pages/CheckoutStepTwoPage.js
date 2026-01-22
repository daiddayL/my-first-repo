import { BasePage } from './BasePage.js';

export class CheckoutStepTwoPage extends BasePage {
    constructor(page) {
        super(page);

        this.continueButton = page.locator('#finish');
    }
    
    async finishCheckout(){
        await this.click(this.continueButton);
    }
}
import { BasePage } from './BasePage.js';

export class CheckoutStepOnePage extends BasePage {
    constructor(page) {
        super(page);

        this.firstNameField = page.locator('#first-name');
        this.lastNameField = page.locator('#last-name');
        this.postalCode = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
    }
    
    async fillUserInfo(firstname, lastname, postalcode) {
        await this.type(this.firstNameField, firstname);
        await this.type(this.lastNameField, lastname);
        await this.type(this.postalCode, postalcode);
        
    }
    async continue(){
        await this.click(this.continueButton);
    }
}
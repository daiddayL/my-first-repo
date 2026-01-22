export class BasePage {
    constructor(page) {
        this.page = page;
    }
    
    async open(url) {
        await this.page.goto(url);
    }
    
    async click(locator) {
        await locator.click();
    }
    
    async type(locator, text) {
        await locator.fill(text);
    }
}
import { BasePage } from './BasePage.js';

export class LoginPage extends BasePage {
    constructor(page) {
        super(page);

        this.usernameField = page.locator('#user-name');
        this.passwordField = page.locator('#password');
        this.loginButton = page.locator('#login-button');
    }
    async open(url = 'https://www.saucedemo.com/') {
        await this.page.goto(url);
        await this.page.waitForLoadState('networkidle');
    }
    async login(username, password) {
        await this.type(this.usernameField, username);
        await this.type(this.passwordField, password);
        await this.click(this.loginButton);
    }
}
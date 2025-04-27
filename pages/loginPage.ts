import { Locator, Page } from '@playwright/test';

export default class LoginPage {
    usernameField:Locator;
    passwordField:Locator;
    loginButton:Locator;
    errorMessage:Locator;

    constructor(public page:Page) {
        this.usernameField = this.page.locator('//input[@id="user-name"]');
        this.passwordField = this.page.locator('//input[@id="password"]');
        this.loginButton = this.page.locator('//input[@id="login-button"]');

        this.errorMessage = this.page.locator('//div[@class="error-message-container error"]');
    }

    async enterUsername(username:string) {
        await this.usernameField.fill(username)
    }

    async enterPassword(password:string) {
        await this.passwordField.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async login(username:string, password:string) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

    async isErrorMessageDisplayed() {
        return await this.errorMessage.isVisible();
    }

    async getErrorMessageText() {
        return await this.errorMessage.textContent();
    }
}
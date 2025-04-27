import { Locator, Page } from '@playwright/test';

export default class CheckoutPage {

    pageHeaderTitle:Locator;

    // Your Information Section
    firstNameField:Locator;
    lastNameField:Locator;
    postalCodeField:Locator;

    continueBtn:Locator;
    cancelBtn:Locator;

    errorMessage:Locator;

    // Overview Section
    finishBtn:Locator;

    // Complete Section
    backToHomeBtn:Locator;

    constructor(public page:Page) {

        this.pageHeaderTitle = this.page.locator('//span[@class="title"]');

        this.firstNameField = this.page.locator('//input[@id="first-name"]');
        this.lastNameField = this.page.locator('//input[@id="last-name"]');
        this.postalCodeField = this.page.locator('//input[@id="postal-code"]');

        this.continueBtn = this.page.locator('//input[@id="continue"]');
        this.cancelBtn = this.page.locator('//button[@id="cancel"]');

        this.errorMessage = this.page.locator('//div[@class="error-message-container error"]');

        this.finishBtn = this.page.locator('//button[@id="finish"]');


    }

    async getHeaderTitle() {
        return await this.pageHeaderTitle.textContent();
    }

    async enterFirstName(firstName:string) {
        await this.firstNameField.fill(firstName);
    }

    async enterLastName(lastName:string) {
        await this.lastNameField.fill(lastName);
    }

    async enterPostalCode(postalCode:string) {
        await this.postalCodeField.fill(postalCode);
    }

    async cancelCheckout() {
        await this.cancelBtn.click();
    }

    async continueCheckout() {
        await this.continueBtn.click();
    }

    async finishCheckout() {
        await this.finishBtn.click();
    }

    async goBackToHome() {
        await this.backToHomeBtn.click();
    }

    async fillOutCheckoutForm(firstName, lastName, postalCode) {
        await this.enterFirstName(firstName);
        await this.enterLastName(lastName);
        await this.enterPostalCode(postalCode);
    }

    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }

}
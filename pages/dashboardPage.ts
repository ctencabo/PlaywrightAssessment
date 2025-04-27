import { Locator, Page } from '@playwright/test';

export default class DashboardPage {

    backpackAddToCartBtn:Locator;
    backpackRemoveToCartBtn:Locator;

    cartIcon:Locator;
    cartCountBadge:Locator;

    constructor(public page:Page) {
        this.backpackAddToCartBtn = this.page.locator('//button[@id="add-to-cart-sauce-labs-backpack"]');
        this.backpackRemoveToCartBtn = this.page.locator('//button[@id="remove-sauce-labs-backpack"]');

        this.cartIcon = this.page.locator('//a[@class="shopping_cart_link"]');
        this.cartCountBadge = this.page.locator('//span[@class="shopping_cart_badge"]');
    }

    async clickBackpackAddToCart() {
        await this.backpackAddToCartBtn.click();
    }

    async clickBackpackRemoveToCart() {
        await this.backpackRemoveToCartBtn.click();
    }

    async clickCartIcon() {
        await this.cartIcon.click();
    }

    async getCartCountOnBadge() {
        return await this.cartCountBadge.textContent();
    }

    async isCartCountBadgeDisplayed() {
        return await this.cartCountBadge.isVisible();
    }

}
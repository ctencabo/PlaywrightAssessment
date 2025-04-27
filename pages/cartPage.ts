import { Locator, Page } from '@playwright/test';

export default class CartPage {

    continueShoppingBtn:Locator;
    checkoutBtn:Locator;

    cartItems:Promise<Locator[]>;
    removeBtns:Promise<Locator[]>;

    inventoryItemNameLabel:Locator;
    inventoryItemPriceLabel:Locator;

    backpackRemoveToCartBtn:Locator;

    constructor(public page:Page) {
        this.continueShoppingBtn = this.page.locator('//button[@id="continue-shopping"]');
        this.checkoutBtn = this.page.locator('//button[@id="checkout"]');

        this.cartItems = this.page.locator('//div[@class="cart-items"]').all();
        this.removeBtns = this.page.locator('//button[@class="btn btn_secondary btn_small cart_button"]').all();

        this.inventoryItemNameLabel = this.page.locator('//div[@class="inventory_item_name"]');
        this.inventoryItemPriceLabel = this.page.locator('//div[@class="inventory_item_price"]');
    }

    fetchNewItems() {
        this.cartItems = this.page.locator('//div[@class="cart-items"]').all();
        this.removeBtns = this.page.locator('//button[@class="btn btn_secondary btn_small cart_button"]').all();
    }

    async getNumberOfItems() {
        this.fetchNewItems();

        let items = await this.cartItems;
        console.log(items.length);
        return items.length;
    }

    async removeRecentlyAddedItem() {
        this.fetchNewItems();

        let tempArray = await this.removeBtns;
        let removeBtn = tempArray[tempArray.length - 1];
        
        removeBtn.click();
    }

    async removeAllItems() {
        for (const removeBtn of await this.removeBtns) {
            await removeBtn.click();
        }
    }

    async clickContinueShopping() {
        await this.continueShoppingBtn.click();
    }

    async clickCheckout() {
        await this.checkoutBtn.click();
    }

    async getItemName() {
        return await this.inventoryItemNameLabel.textContent();
    }

    async getItemPrice() {
        return await this.inventoryItemPriceLabel.textContent();
    }
}
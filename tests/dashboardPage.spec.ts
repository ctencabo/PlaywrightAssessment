import { test, expect } from '@playwright/test';
import LoginPage from '../pages/loginPage';
import DashboardPage from '../pages/dashboardPage';
import CartPage from '../pages/cartPage';

test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}`);
});

test.describe('Test Scenario # 2: Add to cart', () => {
    test('ADD_CART_00: Success Flow for adding an item to cart', async ({ page }) => {
        // ARRANGE
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        const cartPage = new CartPage(page);

        // TEST DATA
        let username = "standard_user";
        let password = "secret_sauce";

        // PRECONDITION
        await loginPage.login(username, password);

        // ACT
        await dashboardPage.clickBackpackAddToCart();

        // ASSERT
        expect(await dashboardPage.getCartCountOnBadge()).toBe("1");
        await dashboardPage.clickCartIcon();
        expect(await cartPage.getItemName()).toBe("Sauce Labs Backpack");
        expect(await cartPage.getItemPrice()).toBe("$29.99");

        // CLEANUP
        await cartPage.removeAllItems();
    });
});

test.describe('Test Scenario # 3: Remove item to cart', () => {
    test('RMV_CART_00: Success Flow of removing item to cart', async ({ page }) => {
        // ARRANGE
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        const cartPage = new CartPage(page);

        // TEST DATA
        let username = "standard_user";
        let password = "secret_sauce";

        // PRECONDITION
        await loginPage.login(username, password);
        await dashboardPage.clickBackpackAddToCart();
        
        // ACT
        await dashboardPage.clickBackpackRemoveToCart();

        // ASSERT
        expect(await dashboardPage.isCartCountBadgeDisplayed()).toBe(false);
    });

    test('RMV_CART_01: Sad Flow of removing item to cart', async ({ page }) => {
        // ARRANGE
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        const cartPage = new CartPage(page);

        // TEST DATA
        let username = "error_user";
        let password = "secret_sauce";

        // PRECONDITION
        await loginPage.login(username, password);
        await dashboardPage.clickBackpackAddToCart();

        // ACT
        await dashboardPage.clickBackpackRemoveToCart();

        // ASSERT
        expect(await dashboardPage.getCartCountOnBadge()).not.toBe(0);
    });
});
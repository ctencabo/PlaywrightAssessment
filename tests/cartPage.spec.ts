import { test, expect } from '@playwright/test';
import LoginPage from '../pages/loginPage';
import DashboardPage from '../pages/dashboardPage';
import CartPage from '../pages/cartPage';
import CheckoutPage from '../pages/checkoutPage';

test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}`);
});

test.describe('Test Scenario # 4: Remove item on cart from cart page', () => {
    test('RMV_CART_CART_00: Success Flow of removing item on cart', async ({ page }) => {
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
        await dashboardPage.clickCartIcon();
        
        // ACT
        await cartPage.removeRecentlyAddedItem();

        // ASSERT
        expect(await cartPage.getNumberOfItems()).toBe(0);
    });

    test('RMV_CART_CART_01: Sad Flow of removing item on cart', async ({ page }) => {
        // ARRANGE
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        const cartPage = new CartPage(page);

        // TEST DATA
        let username = "standard_user";
        let password = "secret_sauce";

        // PRECONDITION
        await loginPage.login(username, password);
        await dashboardPage.clickCartIcon();
        
        // ASSERT
        expect(await cartPage.getNumberOfItems()).toBe(0);
    });
});

test.describe('Test Scenario # 5: Checking out Items', () => {
    test('CHECKOUT_00: Success Flow for checking out items', async ({ page }) => {
        // ARRANGE
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        // TEST DATA
        let username = "standard_user";
        let password = "secret_sauce";
        let firstname = "Standard";
        let lastname = "User";
        let postalCode = "1234";

        // PRECONDITION
        await loginPage.login(username, password);
        await dashboardPage.clickBackpackAddToCart();
        await dashboardPage.clickCartIcon();
        
        // ACT
        await cartPage.clickCheckout();
        await checkoutPage.fillOutCheckoutForm(firstname, lastname, postalCode);
        await checkoutPage.continueCheckout();
        await checkoutPage.finishCheckout();

        // ASSERT
        expect(await checkoutPage.getHeaderTitle()).toBe("Checkout: Complete!");
    });

    test('CHECKOUT_01: Sad Flow for checking out items', async ({ page }) => {
        // ARRANGE
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        // TEST DATA
        let username = "standard_user";
        let password = "secret_sauce";
        let firstname = "Standard";
        let lastname = "User";

        // PRECONDITION
        await loginPage.login(username, password);
        await dashboardPage.clickBackpackAddToCart();
        await dashboardPage.clickCartIcon();
        
        // ACT & ASSERT
        await cartPage.clickCheckout();
        await checkoutPage.continueCheckout();
        expect(await checkoutPage.getErrorMessage()).toBe("Error: First Name is required");
        await checkoutPage.enterFirstName(firstname);
        await checkoutPage.continueCheckout();
        expect(await checkoutPage.getErrorMessage()).toBe("Error: Last Name is required");
        await checkoutPage.enterLastName(lastname);
        await checkoutPage.continueCheckout();
        expect(await checkoutPage.getErrorMessage()).toBe("Error: Postal Code is required");

        // CLEANUP
        await checkoutPage.cancelCheckout();
        await cartPage.removeAllItems();
    });
});
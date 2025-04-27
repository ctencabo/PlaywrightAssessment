import { test, expect } from '@playwright/test';
import LoginPage from '../pages/loginPage';

test.beforeEach(async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
});

test.describe('Test Scenario #1: Login Test Suite', () =>{
    test('TC_00: Log in Success Flow', async ({ page }) => {
        // ARRANGE
        const loginPage = new LoginPage(page);

        // TEST DATA
        let username = "standard_user";
        let password = "secret_sauce";

        // ACT
        await loginPage.login(username, password);

        // ASSERT
        expect(page.url()).toContain('/inventory.html');
    });

    test('TC_01: Log in Sad Flow: Blank Form', async ({ page }) => {
        // ARRANGE
        const loginPage = new LoginPage(page);

        // ACT
        await loginPage.clickLoginButton();

        // ASSERT
        expect(await loginPage.isErrorMessageDisplayed()).toBe(true);
        expect(await loginPage.getErrorMessageText()).toBe("Epic sadface: Username is required");
    });

    test('TC_02: Log in Sad Flow: Blank Password', async ({ page }) => {
        // ARRANGE
        const loginPage = new LoginPage(page);

        // TEST DATA
        let username = "standard_user";

        // ACT
        await loginPage.enterUsername(username);
        await loginPage.clickLoginButton();

        // ASSERT
        expect(await loginPage.isErrorMessageDisplayed()).toBe(true);
        expect(await loginPage.getErrorMessageText()).toBe("Epic sadface: Password is required");
    });

    test('TC_03: Log in Sad Flow: Invalid Credentials', async ({ page }) => {
        // ARRANGE
        const loginPage = new LoginPage(page);

        // TEST DATA
        let username = "doesNotExist";
        let password = "wrongPassword"

        // ACT
        await loginPage.login(username, password);

        // ASSERT
        expect(await loginPage.isErrorMessageDisplayed()).toBe(true);
        expect(await loginPage.getErrorMessageText()).toBe(
            "Epic sadface: Username and password do not match any user in this service"
        );
    });
});
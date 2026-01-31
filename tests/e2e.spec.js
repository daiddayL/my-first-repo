import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage.js';
import { CheckoutStepTwoPage } from '../pages/CheckoutStepTwoPage.js';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage.js';

test('полноценный e2e тест @ui', async ({page})=>{
const loginPage = new LoginPage(page);
const inventoryPage = new InventoryPage(page);
const cartPage = new CartPage(page);
const checkoutStepOnePage = new CheckoutStepOnePage(page);
const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
const checkoutCompletePage = new CheckoutCompletePage(page);

await loginPage.open();
await loginPage.login('standard_user','secret_sauce');

const pageTitle = await inventoryPage.GetPageTitle();
await expect(pageTitle).toBe('Products')

await inventoryPage.sortItems('hilo');

const isButtonVisible = await inventoryPage.firstItemButton.isVisible();
console.log('Кнопка Add to cart видна?', isButtonVisible);

const addedItem = await inventoryPage.addItemToCart();
await inventoryPage.openCart();

await cartPage.verifyItem(addedItem.name,addedItem.price);
await cartPage.goToCheckout();

await checkoutStepOnePage.fillUserInfo('nikita','adamonis','12345');
await checkoutStepOnePage.continue();

await checkoutStepTwoPage.finishCheckout();

const message = await checkoutCompletePage.getCompletionMessage();
console.log(message);
});
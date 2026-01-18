// @ts-check
import { test, expect } from '@playwright/test';



test('Вам нужно написать тест, который проверяет успешный вход в систему', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.fill('#user-name','standard_user')
  await page.fill('#password','secret_sauce')
  await page.click('#login-button')

  await expect(page).toHaveURL(/inventory\.html/);
});

test('Напишите еще один тест в том же файле, который проверяет сценарий неуспешного входа с заблокированным пользователем', async ({ page }) =>{
    await page.goto('https://www.saucedemo.com/');

    await page.fill('#user-name','locked_out_user')
  await page.fill('#password','secret_sauce')
  await page.click('#login-button')

  await expect(page.locator('body')).toContainText('Epic sadface: Sorry, this user has been locked out.');
});
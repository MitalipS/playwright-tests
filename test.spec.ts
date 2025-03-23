import { test, expect } from '@playwright/test';
test.setTimeout(60000); // Set timeout to 60 seconds
test('User Login, Add Multiple Products to Cart, and Place Order', async ({ page }) => {
  // Navigate to the website
  console.log('Navigating to the website...');
  await page.goto('https://automationexercise.com/');

  // Login to the account
  console.log('Navigating to Signup/Login page...');
  await page.getByRole('link', { name: ' Signup / Login' }).click();
  console.log('Filling in login credentials...');
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill('Waino.Feest41@yahoo.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('EeAWNsmGIm_eDv7');
  await page.getByRole('button', { name: 'Login' }).click();

  // Verify login success
  console.log('Verifying login success...');
  await expect(page.getByText('Logged in as')).toBeVisible();

  // Navigate to Products and add products to the cart
  console.log('Navigating to Products...');
  await page.getByRole('link', { name: ' Products' }).click();

  console.log('Navigating to Men category...');
  await page.getByRole('link', { name: ' Men' }).click();
  console.log('Adding Jeans to the cart...');
  await page.getByRole('link', { name: 'Jeans' }).click();
  await page.getByRole('link', { name: ' View Product' }).first().click();
  await page.getByRole('button', { name: ' Add to cart' }).click();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();

  console.log('Adding Polo to the cart...');
  await page.getByRole('link', { name: '(6) Polo' }).click();
  await page.locator('.choose > .nav > li > a').first().click();
  await page.getByRole('button', { name: ' Add to cart' }).click();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();

  console.log('Adding Biba to the cart...');
  await page.getByRole('link', { name: '(5) Biba' }).click();
  await page.getByRole('link', { name: ' View Product' }).first().click();
  await page.getByRole('button', { name: ' Add to cart' }).click();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();

  // View the cart and proceed to checkout
  console.log('Viewing the cart...');
  await page.getByRole('link', { name: ' Cart' }).click();
  console.log('Proceeding to checkout...');
  await page.getByText('Proceed To Checkout').click();

  // Place the order
  console.log('Placing the order...');
  await page.getByRole('link', { name: 'Place Order' }).click();
  console.log('Filling in payment details...');
  await page.locator('input[name="name_on_card"]').fill('Mitali');
  await page.locator('input[name="card_number"]').fill('1111111111111111');
  await page.getByRole('textbox', { name: 'ex.' }).fill('311');
  await page.getByRole('textbox', { name: 'MM' }).fill('10');
  await page.getByRole('textbox', { name: 'YYYY' }).fill('2029');
  console.log('Confirming the order...');
  await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();

  // Verify order success
  console.log('Verifying order success...');
  await expect(page.locator('#form')).toContainText('Order Placed!');

  // Continue after placing the order
  console.log('Continuing after placing the order...');
  await page.getByRole('link', { name: 'Continue' }).click();
});
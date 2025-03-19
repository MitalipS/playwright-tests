import { test, expect } from '@playwright/test';

test('User Login, Add Product to Cart, and Place Order', async ({ page }) => {
  // Navigate to the website
  console.log('Navigating to the website...');
  await page.goto('https://automationexercise.com/');

  // Login to the account
  console.log('Navigating to Signup/Login page...');
  await page.getByRole('link', { name: ' Signup / Login' }).click();
  console.log('Filling in login credentials...');
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill('Winona.MacGyver50@yahoo.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('gYwxJUKqQT3NKUR');
  await page.getByRole('button', { name: 'Login' }).click();

  // Verify login success
  console.log('Verifying login success...');
  await expect(page.getByText('Logged in as')).toBeVisible();

  // Navigate to Products and add a product to the cart
  console.log('Navigating to Products...');
  await page.getByRole('link', { name: ' Products' }).click();
  console.log('Navigating to Women category...');
  await page.getByRole('link', { name: ' Women' }).click();
  console.log('Selecting a product...');
  await page.getByRole('link', { name: 'Saree' }).click();
  await page.getByRole('link', { name: ' View Product' }).first().click();
  console.log('Adding product to the cart...');
  await page.getByRole('button', { name: ' Add to cart' }).click();

  // View the cart and proceed to checkout
  console.log('Viewing the cart...');
  await page.getByRole('link', { name: 'View Cart' }).click();
  console.log('Proceeding to checkout...');
  await page.getByText('Proceed To Checkout').click();

  // Place the order
  console.log('Placing the order...');
  await page.getByRole('link', { name: 'Place Order' }).click();
  console.log('Filling in payment details...');
  await page.locator('input[name="name_on_card"]').fill('maty');
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
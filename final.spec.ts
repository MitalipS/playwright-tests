import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('User Signup and Account Creation with Randomized Data', async ({ page }) => {
  // Generate randomized data using faker
  const randomName = faker.person.firstName();
  const randomLastName = faker.person.lastName();
  const randomEmail = faker.internet.email();
  const randomPassword = faker.internet.password();
  const randomCompany = faker.company.name();
  const randomAddress = faker.location.streetAddress();
  const randomCity = faker.location.city();
  const randomState = faker.location.state();
  const randomZipcode = faker.location.zipCode();
  const randomMobileNumber = faker.phone.number('##########'); // 10-digit phone number

  // Print the generated user details to the console
  console.log('Generated User Details:');
  console.log(`Name: ${randomName} ${randomLastName}`);
  console.log(`Email: ${randomEmail}`);
  console.log(`Password: ${randomPassword}`);
  console.log(`Company: ${randomCompany}`);
  console.log(`Address: ${randomAddress}`);
  console.log(`City: ${randomCity}`);
  console.log(`State: ${randomState}`);
  console.log(`Zipcode: ${randomZipcode}`);
  console.log(`Mobile Number: ${randomMobileNumber}`);

  // Navigate to the website
  console.log('Navigating to the website...');
  await page.goto('https://automationexercise.com/');

  // Navigate to the Signup/Login page
  console.log('Navigating to Signup/Login page...');
  await page.getByRole('link', { name: ' Signup / Login' }).click();

  // Fill in the signup form with randomized name and email
  console.log('Filling in the signup form...');
  await page.getByRole('textbox', { name: 'Name' }).fill(randomName);
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(randomEmail);
  await page.getByRole('button', { name: 'Signup' }).click();

  // Fill in the account creation form
  console.log('Filling in the account creation form...');
  await page.locator('#form form div').filter({ hasText: 'Mr.' }).nth(1).click();
  await page.getByRole('textbox', { name: 'Password *' }).fill(randomPassword);
  await page.locator('#days').selectOption('17');
  await page.locator('#months').selectOption('3');
  await page.locator('#years').selectOption('2003');
  await page.getByRole('textbox', { name: 'First name *' }).fill(randomName);
  await page.getByRole('textbox', { name: 'Last name *' }).fill(randomLastName);
  await page.getByRole('textbox', { name: 'Company', exact: true }).fill(randomCompany);
  await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill(randomAddress);
  await page.getByRole('textbox', { name: 'State *' }).fill(randomState);
  await page.getByRole('textbox', { name: 'City * Zipcode *' }).fill(randomCity);
  await page.locator('#zipcode').fill(randomZipcode);
  await page.getByRole('textbox', { name: 'Mobile Number *' }).fill(randomMobileNumber);

  // Submit the account creation form
  console.log('Submitting the account creation form...');
  await page.getByRole('button', { name: 'Create Account' }).click();

  // Verify account creation success message
  console.log('Verifying account creation success...');
  await expect(page.locator('b')).toContainText('Account Created!');

  // Continue to the account page
  console.log('Continuing to the account page...');
  await page.getByRole('link', { name: 'Continue' }).click();
});

test('User Navigation and Logout Flow', async ({ page }) => {
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
  await expect(page.getByText('Logged in as Kaelyn')).toBeVisible();

  // Navigate through various sections
  console.log('Navigating to Products...');
  await page.getByRole('link', { name: ' Products' }).click();

  console.log('Navigating to Cart...');
  await page.getByRole('link', { name: ' Cart' }).click();

  console.log('Navigating to Test Cases...');
  await page.getByRole('link', { name: ' Test Cases' }).click();

  console.log('Navigating to API Testing...');
  await page.getByRole('link', { name: ' API Testing' }).click();

  console.log('Navigating to Video Tutorials...');
  await page.getByRole('link', { name: ' Video Tutorials' }).click();

   // Go back in the browser
   console.log('Going back in the browser...');
   await page.goBack();
  
  console.log('Navigating to Contact Us...');
  await page.getByRole('link', { name: ' Contact us' }).click();

  // Logout from the account
  console.log('Logging out...');
  await page.getByRole('link', { name: ' Logout' }).click();

  // Verify logout success
  console.log('Verifying logout success...');
  await expect(page.getByRole('link', { name: ' Signup / Login' })).toBeVisible();
});

test('Verify login with incorrect credentials', async ({ page }) => {
  // Navigate to the website
  console.log('Navigating to the website...');
  await page.goto('https://automationexercise.com/');

  // Navigate to the Signup/Login page
  console.log('Navigating to Signup/Login page...');
  await page.getByRole('link', { name: ' Signup / Login' }).click();

  // Fill in the login form with incorrect credentials
  console.log('Filling in login credentials...');
  const emailField = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
  const passwordField = page.getByRole('textbox', { name: 'Password' });

  await emailField.fill('Candida.Barton@hotmail.com');
  await passwordField.fill('K17Kz_nhmhfvCqV');

  // Attempt to log in
  console.log('Attempting to log in...');
  await page.getByRole('button', { name: 'Login' }).click();

  // Verify error message for incorrect credentials
  console.log('Verifying error message...');
  const errorMessage = page.locator('#form');
  await expect(errorMessage).toContainText('Your email or password is incorrect!');
});


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
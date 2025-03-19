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


test('test', async ({ page }) => {
  await page.goto('https://automationexercise.com/');
  await page.getByRole('link', { name: ' Signup / Login' }).click();
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').click();
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill('Winona.MacGyver50@yahoo.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('gYwxJUKqQT3NKUR');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: ' Products' }).click();
  await page.getByRole('link', { name: ' Cart' }).click();
  await page.getByRole('link', { name: ' Test Cases' }).click();
  await page.getByRole('link', { name: ' API Testing' }).click();
  await page.getByRole('link', { name: ' Video Tutorials' }).click();
  await page.getByRole('link', { name: ' Contact us' }).click();
  await page.getByText('Logged in as Kaelyn').click();
  await page.getByRole('link', { name: ' Logout' }).click();
});
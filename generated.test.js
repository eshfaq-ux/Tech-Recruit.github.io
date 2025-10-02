```javascript
import { test, expect } from '@playwright/test';
import path from 'path';

// This test assumes the test file is in a directory parallel to the 'source code' directory.
// e.g., /project/tests/contact-form.spec.js and /project/source code/webdev.html
const webdevPage = `file://${path.resolve(__dirname, '..', 'source code', 'webdev.html')}`;

test.describe('Contact Form Validation on webdev.html', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the local HTML file before each test
    await page.goto(webdevPage);
  });

  test('should prevent submission and show validation warnings for empty required fields', async ({ page }) => {
    // Locate the form elements
    const nameInput = page.locator('#name');
    const emailInput = page.locator('#email');
    const messageInput = page.locator('#message');
    const submitButton = page.getByRole('button', { name: 'Send Message' });

    // Ensure the URL is the initial one before the click
    const initialUrl = page.url();

    // Click the submit button without filling out any fields
    await submitButton.click();

    // Verify that the form submission was prevented (i.e., no navigation occurred)
    expect(page.url()).toBe(initialUrl);

    // Check the HTML5 validation state for each required field.
    // We check the `valueMissing` property of the ValidityState API.
    const isNameInvalid = await nameInput.evaluate(el => (el as HTMLInputElement).validity.valueMissing);
    const isEmailInvalid = await emailInput.evaluate(el => (el as HTMLInputElement).validity.valueMissing);
    const isMessageInvalid = await messageInput.evaluate(el => (el as HTMLTextAreaElement).validity.valueMissing);

    // Assert that each field is correctly identified as invalid because its value is missing.
    expect(isNameInvalid, 'The "Name" input should be invalid when empty.').toBe(true);
    expect(isEmailInvalid, 'The "Email" input should be invalid when empty.').toBe(true);
    expect(isMessageInvalid, 'The "Message" textarea should be invalid when empty.').toBe(true);

    // Check that a validation message has been set by the browser.
    // The exact text can vary between browsers, so we just check that it's not empty.
    const nameValidationMessage = await nameInput.evaluate(el => (el as HTMLInputElement).validationMessage);
    const emailValidationMessage = await emailInput.evaluate(el => (el as HTMLInputElement).validationMessage);
    const messageValidationMessage = await messageInput.evaluate(el => (el as HTMLTextAreaElement).validationMessage);

    expect(nameValidationMessage).not.toBe('');
    expect(emailValidationMessage).not.toBe('');
    expect(messageValidationMessage).not.toBe('');
  });
});
```
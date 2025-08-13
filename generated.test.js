```javascript
// test/signup.test.js
const { Builder, By, Key, until } = require('selenium-webdriver');

describe('Signup Form Test', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  it('should successfully submit valid user data', async () => {
    await driver.get('file:///path/to/your/source/code/signup.html'); //Replace with actual path

    await driver.findElement(By.id('name')).sendKeys('Test User');
    await driver.findElement(By.id('email')).sendKeys('testuser@example.com');
    await driver.findElement(By.id('password')).sendKeys('Password123');
    await driver.findElement(By.css('button[type="submit"]')).click();

    // Add assertion to check for successful submission.  This will depend on your implementation.  Example:
    // await driver.wait(until.elementLocated(By.id('success-message')), 5000); 
    // expect(await driver.findElement(By.id('success-message')).getText()).toContain('Success!');

  });


  it('should handle empty fields', async () => {
    await driver.get('file:///path/to/your/source/code/signup.html'); //Replace with actual path

    await driver.findElement(By.css('button[type="submit"]')).click();

    // Add assertion to check for error messages. Example:
    // const errorMessage = await driver.findElement(By.id('name-error')).getText();
    // expect(errorMessage).toContain('Name is required');

  });


  it('should handle invalid email format', async () => {
    await driver.get('file:///path/to/your/source/code/signup.html'); //Replace with actual path

    await driver.findElement(By.id('name')).sendKeys('Test User');
    await driver.findElement(By.id('email')).sendKeys('invalid-email');
    await driver.findElement(By.id('password')).sendKeys('Password123');
    await driver.findElement(By.css('button[type="submit"]')).click();

    // Add assertion to check for error messages. Example:
    // const errorMessage = await driver.findElement(By.id('email-error')).getText();
    // expect(errorMessage).toContain('Invalid email format');
  });
});

```

```javascript
// test/cv-generator.test.js
const { Builder, By, Key, until } = require('selenium-webdriver');

describe('CV Generator Form', () => {
    let driver;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('file:///path/to/your/cv-generator.html'); // Replace with actual path
    });

    afterAll(async () => {
        await driver.quit();
    });

    it('should capture and display all user inputs', async () => {
        const nameInput = await driver.findElement(By.id('name'));
        const emailInput = await driver.findElement(By.id('email'));
        const phoneInput = await driver.findElement(By.id('phone'));
        const addressInput = await driver.findElement(By.id('address'));
        const educationInstitutionInput = await driver.findElement(By.id('education-institution'));
        const educationDegreeInput = await driver.findElement(By.id('education-degree'));
        const educationYearInput = await driver.findElement(By.id('education-year'));
        const experienceTitleInput = await driver.findElement(By.id('experience-title'));
        const experienceCompanyInput = await driver.findElement(By.id('experience-company'));
        const experienceDurationInput = await driver.findElement(By.id('experience-duration'));
        const experienceDescriptionInput = await driver.findElement(By.id('experience-description'));
        const submitButton = await driver.findElement(By.css('button[type="submit"]'));


        const testValues = {
            name: 'Test User',
            email: 'test@example.com',
            phone: '1234567890',
            address: '123 Test Street',
            educationInstitution: 'Test University',
            educationDegree: 'Test Degree',
            educationYear: '2023',
            experienceTitle: 'Test Job',
            experienceCompany: 'Test Company',
            experienceDuration: '1 year',
            experienceDescription: 'Test description',
        };

        await nameInput.sendKeys(testValues.name);
        await emailInput.sendKeys(testValues.email);
        await phoneInput.sendKeys(testValues.phone);
        await addressInput.sendKeys(testValues.address);
        await educationInstitutionInput.sendKeys(testValues.educationInstitution);
        await educationDegreeInput.sendKeys(testValues.educationDegree);
        await educationYearInput.sendKeys(testValues.educationYear);
        await experienceTitleInput.sendKeys(testValues.experienceTitle);
        await experienceCompanyInput.sendKeys(testValues.experienceCompany);
        await experienceDurationInput.sendKeys(testValues.experienceDuration);
        await experienceDescriptionInput.sendKeys(testValues.experienceDescription);

        await submitButton.click();

        // Add assertions here to verify that the data is displayed correctly.  This will depend on how your cv-generator.html displays the submitted data.
        // Example using a specific element to check for the name:

        await driver.wait(until.elementLocated(By.id('displayedName')), 5000); // Replace 'displayedName' with the actual ID
        const displayedName = await driver.findElement(By.id('displayedName')).getText();
        expect(displayedName).toBe(testValues.name);

        // Add similar assertions for other fields.

    }, 15000); // Increased timeout to account for potential delays
});

```

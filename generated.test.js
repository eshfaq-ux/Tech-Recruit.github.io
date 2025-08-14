```javascript
const { Builder, By, Key, until } = require('selenium-webdriver');

describe('eLEARNING Website Navigation', () => {
    let driver;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
    });

    afterAll(async () => {
        await driver.quit();
    });

    it('should navigate to Home page', async () => {
        await driver.get('file:///path/to/your/index.html'); //replace with actual path
        expect(await driver.getTitle()).toContain('ELEARNING');
    });


    it('should navigate to About page', async () => {
        await driver.get('file:///path/to/your/courses.html'); //replace with actual path
        await driver.findElement(By.linkText('About')).click();
        await driver.wait(until.titleIs('About'), 5000);
        expect(await driver.getTitle()).toContain('About');
    });

    it('should navigate to Courses page', async () => {
        await driver.get('file:///path/to/your/courses.html'); //replace with actual path
        await driver.findElement(By.linkText('Courses')).click();
        await driver.wait(until.titleIs('ELEARNING'), 5000);
        expect(await driver.getTitle()).toContain('ELEARNING');

    });

    it('should navigate to Pages dropdown options', async () => {
        await driver.get('file:///path/to/your/courses.html'); //replace with actual path
        await driver.findElement(By.linkText('Pages')).click();
        const pages = await driver.findElements(By.css('.dropdown-menu a'));
        expect(pages.length).toBe(3);

        const pageLinks = await Promise.all(pages.map(async (page) => await page.getAttribute('href')));
        expect(pageLinks).toContain('team.html');
        expect(pageLinks).toContain('testimonial.html');
        expect(pageLinks).toContain('404.html');


        await driver.findElement(By.linkText('Our Team')).click();
        await driver.wait(until.titleContains('Our Team'), 5000); // adjust timeout as needed


        await driver.navigate().back();
        await driver.findElement(By.linkText('Testimonial')).click();
        await driver.wait(until.titleContains('Testimonial'), 5000); // adjust timeout as needed

        await driver.navigate().back();
        await driver.findElement(By.linkText('404 Page')).click();
        await driver.wait(until.titleContains('404'), 5000); // adjust timeout as needed

    });

    it('should navigate to Contact page', async () => {
        await driver.get('file:///path/to/your/courses.html'); //replace with actual path
        await driver.findElement(By.linkText('Contact')).click();
        await driver.wait(until.titleIs('Contact'), 5000);
        expect(await driver.getTitle()).toContain('Contact');
    });
});

```

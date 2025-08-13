```javascript
// This test suite requires a setup that simulates the HTML form and its interactions.
// Since the provided HTML doesn't include any JavaScript logic for CV generation,
// this test focuses on validating form submission.  A real-world test would need 
// to incorporate a backend and potentially a headless browser.

describe('CV Generator Form', () => {
  let form;
  let nameInput;
  let emailInput;
  let phoneInput;
  let addressInput;
  let institutionInput;
  let degreeInput;
  let yearInput;
  let titleInput;
  let companyInput;
  let durationInput;
  let descriptionInput;
  let submitButton;

  beforeEach(() => {
    //Simulate the form and its elements here using a testing library like jsdom or similar
    // Example using jsdom (you'll need to install it: npm install jsdom)

    const { JSDOM } = require("jsdom");
    const dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <body>
          <form id="cv-form">
            <input type="text" id="name" name="name" required>
            <input type="email" id="email" name="email" required>
            <input type="tel" id="phone" name="phone" required>
            <input type="text" id="address" name="address" required>
            <input type="text" id="education-institution" name="education-institution" required>
            <input type="text" id="education-degree" name="education-degree" required>
            <input type="text" id="education-year" name="education-year" required>
            <input type="text" id="experience-title" name="experience-title" required>
            <input type="text" id="experience-company" name="experience-company" required>
            <input type="text" id="experience-duration" name="experience-duration" required>
            <textarea id="experience-description" name="experience-description" required></textarea>
            <button type="submit">Generate CV</button>
          </form>
        </body>
      </html>
    `);
    global.document = dom.window.document;
    global.window = dom.window;
    form = document.getElementById('cv-form');
    nameInput = document.getElementById('name');
    emailInput = document.getElementById('email');
    phoneInput = document.getElementById('phone');
    addressInput = document.getElementById('address');
    institutionInput = document.getElementById('education-institution');
    degreeInput = document.getElementById('education-degree');
    yearInput = document.getElementById('education-year');
    titleInput = document.getElementById('experience-title');
    companyInput = document.getElementById('experience-company');
    durationInput = document.getElementById('experience-duration');
    descriptionInput = document.getElementById('experience-description');
    submitButton = form.querySelector('button[type="submit"]');

  });


  it('should submit the form with all required fields filled', () => {
    nameInput.value = 'Test User';
    emailInput.value = 'test@example.com';
    phoneInput.value = '1234567890';
    addressInput.value = '123 Main St';
    institutionInput.value = 'Test University';
    degreeInput.value = 'Test Degree';
    yearInput.value = '2023';
    titleInput.value = 'Test Title';
    companyInput.value = 'Test Company';
    durationInput.value = '2022-2023';
    descriptionInput.value = 'Test Description';

    const submitEvent = new Event('submit');
    form.addEventListener('submit', (event) => {
        // Add assertions here to check if the form data is being handled correctly
        // by your CV generation logic.  This would involve mocking or interacting
        // with the backend.
        expect(event.preventDefault).toHaveBeenCalled();
    });

    spyOn(form, 'preventDefault');
    form.dispatchEvent(submitEvent);
    expect(form.checkValidity()).toBe(true); //Check that form is valid before submission

  });


  it('should prevent form submission if any required field is empty', () => {
    const submitEvent = new Event('submit');
    form.dispatchEvent(submitEvent);
    expect(form.checkValidity()).toBe(false);

  });
});

```
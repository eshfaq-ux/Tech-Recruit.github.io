```javascript
describe('CV Generation', () => {
  it('should generate a CV with all fields populated', () => {
    document.getElementById('name').value = 'Test User';
    document.getElementById('email').value = 'test@example.com';
    document.getElementById('phone').value = '1234567890';
    document.getElementById('address').value = '123 Main St';
    document.getElementById('institution').value = 'Test University';
    document.getElementById('degree').value = 'Bachelor of Science';
    document.getElementById('year').value = '2023';
    document.getElementById('job-title').value = 'Software Engineer';
    document.getElementById('company').value = 'Test Company';
    document.getElementById('duration').value = '2 years';
    document.getElementById('description').value = 'Test description';

    const generateCvBtn = document.getElementById('generate-cv-btn');
    const alertSpy = jest.spyOn(window, 'alert');

    generateCvBtn.click();

    expect(alertSpy).toHaveBeenCalledWith(
      "CV\n\nPersonal Information:\nName: Test User\nEmail: test@example.com\nPhone: 1234567890\nAddress: 123 Main St\n\nEducation:\nInstitution: Test University\nDegree: Bachelor of Science\nYear: 2023\n\nExperience:\nJob Title: Software Engineer\nCompany: Test Company\nDuration: 2 years\nDescription: Test description"
    );

    alertSpy.mockRestore();
  });
});

```

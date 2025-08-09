```javascript
describe('CV Generation', () => {
  it('should generate a CV with all form fields populated', () => {
    document.body.innerHTML = `
      <input type="text" id="name" value="Test Name">
      <input type="text" id="email" value="test@example.com">
      <input type="text" id="phone" value="123-456-7890">
      <input type="text" id="address" value="123 Main St">
      <input type="text" id="institution" value="Test University">
      <input type="text" id="degree" value="Bachelor of Science">
      <input type="text" id="year" value="2023">
      <input type="text" id="job-title" value="Software Engineer">
      <input type="text" id="company" value="Test Company">
      <input type="text" id="duration" value="2 years">
      <input type="text" id="description" value="Test description">
      <button id="generate-cv-btn">Generate CV</button>
    `;

    const generateCvBtn = document.getElementById('generate-cv-btn');
    const alertSpy = jest.spyOn(window, 'alert');

    generateCvBtn.click();

    expect(alertSpy).toHaveBeenCalledWith(
      "CV\n\nPersonal Information:\nName: Test Name\nEmail: test@example.com\nPhone: 123-456-7890\nAddress: 123 Main St\n\nEducation:\nInstitution: Test University\nDegree: Bachelor of Science\nYear: 2023\n\nExperience:\nJob Title: Software Engineer\nCompany: Test Company\nDuration: 2 years\nDescription: Test description"
    );
    alertSpy.mockRestore();
  });
});
```

document.getElementById('generate-cv-btn').addEventListener('click', function() {
    // Get form values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var address = document.getElementById('address').value;
    var institution = document.getElementById('institution').value;
    var degree = document.getElementById('degree').value;
    var year = document.getElementById('year').value;
    var jobTitle = document.getElementById('job-title').value;
    var company = document.getElementById('company').value;
    var duration = document.getElementById('duration').value;
    var description = document.getElementById('description').value;
  
    // Generate CV using the form values
    var cv = "CV\n\n" +
             "Personal Information:\n" +
             "Name: " + name + "\n" +
             "Email: " + email + "\n" +
             "Phone: " + phone + "\n" +
             "Address: " + address + "\n\n" +
             "Education:\n" +
             "Institution: " + institution + "\n" +
             "Degree: " + degree + "\n" +
             "Year: " + year + "\n\n" +
             "Experience:\n" +
             "Job Title: " + jobTitle + "\n" +
             "Company: " + company + "\n" +
             "Duration: " + duration + "\n" +
             "Description: " + description;
  
    // Display the generated CV
    alert(cv);
  });
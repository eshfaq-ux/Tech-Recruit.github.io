```python
import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException

# Replace with your actual website URL
BASE_URL = "https://tech-recruit.github.io" 

@pytest.fixture
def driver():
    driver = webdriver.Chrome() # Or other browser driver like Firefox, Edge etc.  Make sure the webdriver is installed.
    yield driver
    driver.quit()

def test_user_registration_and_login(driver):
    driver.get(BASE_URL + "/register") # Assuming a register page exists

    try:
        #Locate and fill registration form fields.  Adjust selectors as needed based on your website's HTML.
        username_field = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "username")))
        email_field = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "email")))
        password_field = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "password")))
        register_button = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "register-button"))) # Or other appropriate selector


        username_field.send_keys("testuser")
        email_field.send_keys("testuser@example.com")
        password_field.send_keys("password123")
        register_button.click()


        # Assertion to check if registration was successful.  Adjust based on your website's feedback mechanism
        success_message = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "success-message"))) # Or other selector indicating successful registration
        assert "Registration successful!" in success_message.text # Replace with your actual success message


        driver.get(BASE_URL + "/login") # Assumes a login page

        username_login_field = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "username")))
        password_login_field = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "password")))
        login_button = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "login-button"))) #Or other selector

        username_login_field.send_keys("testuser")
        password_login_field.send_keys("password123")
        login_button.click()

        #Assertion to check for successful login.  This depends entirely on how your site handles successful logins
        welcome_message = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "welcome-message"))) #Or other selector showing successful login
        assert "Welcome, testuser!" in welcome_message.text # Replace with your actual welcome message


    except TimeoutException:
        pytest.fail("Element not found within timeout period")
    except Exception as e:
        pytest.fail(f"An error occurred: {e}")

```

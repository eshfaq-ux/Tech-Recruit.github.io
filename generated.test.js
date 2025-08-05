```python
import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Configure webdriver (replace with your preferred browser and driver path)
driver = webdriver.Chrome()  

def test_navigation_and_content():
    driver.get("https://tech-recruit.github.io") # Replace with actual website URL

    # Training Section
    training_link = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.LINK_TEXT, "Training")) # Adjust locator if needed
    )
    training_link.click()
    assert "Training" in driver.title # Adjust assertion based on expected page content
    # Add more assertions to check specific content within the training page


    # Placement Section
    placement_link = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.LINK_TEXT, "Placement")) # Adjust locator if needed
    )
    placement_link.click()
    assert "Placement" in driver.title # Adjust assertion based on expected page content
    # Add more assertions to check specific content within the placement page

    # About Us Section
    about_us_link = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.LINK_TEXT, "About Us")) # Adjust locator if needed
    )
    about_us_link.click()
    assert "About Us" in driver.title # Adjust assertion based on expected page content
    # Add more assertions to check specific content within the about us page

    driver.quit()

```

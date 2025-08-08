```python
import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Configure webdriver (replace with your preferred browser and path)
driver = webdriver.Chrome()  

def test_navigation_and_content():
    driver.get("https://tech-recruit.github.io") # Replace with actual URL

    # Training Section
    training_link = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.LINK_TEXT, "Training"))
    )
    training_link.click()
    assert "Training" in driver.title #check if the title contains training
    # Add assertions to check for specific content on the Training page.  Example:
    assert WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "training-content"))).is_displayed()


    # Placement Section
    driver.back() # Navigate back to the home page.
    placement_link = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.LINK_TEXT, "Placement"))
    )
    placement_link.click()
    assert "Placement" in driver.title #check if the title contains placement
    # Add assertions to check for specific content on the Placement page. Example:
    assert WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "placement-content"))).is_displayed()


    # About Us Section
    driver.back() # Navigate back to the home page.
    about_link = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.LINK_TEXT, "About Us")) #Update with the actual link text if different
    )
    about_link.click()
    assert "About Us" in driver.title #check if the title contains About Us
    # Add assertions to check for specific content on the About Us page. Example:
    assert WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "about-us-content"))).is_displayed()


    driver.quit()

```

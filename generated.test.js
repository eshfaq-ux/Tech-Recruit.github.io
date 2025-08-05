```python
import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Configure browser options for different screen sizes
def get_browser_option(width, height):
    options = webdriver.ChromeOptions()
    options.add_argument(f"window-size={width},{height}")
    return options


@pytest.fixture(params=[
    (1920, 1080),  # Desktop
    (1024, 768),   # Tablet
    (375, 667)    # Mobile
])
def browser(request):
    width, height = request.param
    browser = webdriver.Chrome(options=get_browser_option(width, height))
    yield browser
    browser.quit()



@pytest.mark.parametrize("element_id", ["element_id_1", "element_id_2", "element_id_3"]) # Replace with actual element IDs
def test_responsive_design(browser, element_id):
    browser.get("https://tech-recruit.github.io") # Replace with your actual URL
    try:
        WebDriverWait(browser, 10).until(EC.presence_of_element_located((By.ID, element_id)))
        assert browser.find_element(By.ID, element_id).is_displayed()
        # Add more assertions here to check for specific layout and functionality based on the elements present
    except Exception as e:
        pytest.fail(f"Element with ID '{element_id}' not found or not displayed: {e}")

```

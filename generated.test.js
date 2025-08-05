```python
import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options as ChromeOptions
from selenium.webdriver.firefox.options import Options as FirefoxOptions
from selenium.webdriver.safari.options import Options as SafariOptions

# Define browser options for different browsers
def get_chrome_options():
    options = ChromeOptions()
    options.add_argument("--headless=new") # Run Chrome in headless mode
    return options

def get_firefox_options():
    options = FirefoxOptions()
    options.add_argument("--headless") # Run Firefox in headless mode
    return options

def get_safari_options():
    options = SafariOptions()
    # Safari headless mode is not reliably supported
    return options


@pytest.fixture(params=[
    ("chrome", get_chrome_options),
    ("firefox", get_firefox_options),
    ("safari", get_safari_options), # May require manual setup/configuration for Safari
])
def driver(request):
    browser_name, options_func = request.param
    try:
        if browser_name == "chrome":
            driver = webdriver.Chrome(options=options_func())
        elif browser_name == "firefox":
            driver = webdriver.Firefox(options=options_func())
        elif browser_name == "safari":
            driver = webdriver.Safari(options=options_func())
        else:
            pytest.fail(f"Unsupported browser: {browser_name}")

        yield driver
    finally:
        driver.quit()


@pytest.mark.parametrize("resolution", [
    "1920x1080",  # Desktop
    "1280x800",   # Laptop
    "800x600",    # Smaller screen
    "480x320"     # Mobile
])
def test_website_responsiveness(driver, resolution):
    width, height = map(int, resolution.split('x'))
    driver.set_window_size(width, height)
    driver.get("https://tech-recruit.github.io") # Replace with actual URL

    # Add assertions here to check for responsiveness.  Examples:
    # assert "Tech-Recruit" in driver.title
    # assert len(driver.find_elements("xpath", "//div[@class='responsive-element']")) > 0 # Example selector, replace with actual selectors
    # Check for absence of broken elements or layout issues using appropriate selectors

    # You would need to inspect the website to add meaningful assertions here,
    # possibly including checks for element visibility, correct positioning, etc.

    # Example assertion - check for page load without errors (adjust timeout as needed)
    assert driver.execute_script("return document.readyState") == "complete"


```

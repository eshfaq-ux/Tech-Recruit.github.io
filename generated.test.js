```javascript
/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');
const $ = require('jquery');

// --- Mocking global dependencies from main.js ---

// Mock the WOW.js library constructor, as it's not relevant to this test.
// The script calls `new WOW().init()`, so we need to mock this chain.
global.WOW = jest.fn(() => ({
  init: jest.fn(),
}));

// Mock the owlCarousel jQuery plugin to prevent "is not a function" errors.
// The script calls this on two different elements.
$.fn.owlCarousel = jest.fn();

// --- Test Suite Setup ---

// Read the application script file content.
// This assumes the test file is located in a structure like `tests/main.test.js`
// relative to the `source code/js/main.js` file.
const mainJsPath = path.resolve(__dirname, '../../source code/js/main.js');
const mainJsContent = fs.readFileSync(mainJsPath, 'utf-8');

describe('Sticky Navbar Scroll Behavior', () => {

  beforeEach(() => {
    // Set up a mock DOM for each test, including the target element.
    document.body.innerHTML = `
      <div id="spinner" class="show"></div>
      <nav class="sticky-top" style="position: fixed; top: -100px;"></nav>
      <div style="height: 2000px;"></div> <!-- Tall element to simulate a scrollable page -->
    `;

    // Make jQuery globally available for the script, which expects `(function ($) { ... })(jQuery);`.
    window.$ = window.jQuery = $;

    // Execute the main.js script in the JSDOM environment by adding it to the DOM.
    // This attaches the scroll event listener that we want to test.
    const script = document.createElement('script');
    script.textContent = mainJsContent;
    document.body.appendChild(script);

    // Ensure the initial state is correctly set by the script based on the default scroll position.
    // We set scroll position to 0 and manually trigger the event.
    $(window).scrollTop(0);
    $(window).trigger('scroll');
  });

  afterEach(() => {
    // Clean up the DOM and mocks to ensure test isolation.
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  test('should become visible by adjusting its CSS "top" property when the user scrolls down more than 300 pixels', () => {
    const stickyNav = $('.sticky-top');

    // ARRANGE: Verify the initial hidden state.
    // The script's logic should have set the 'top' property to '-100px' because scrollY is 0.
    expect(stickyNav.css('top')).toBe('-100px');

    // ACT: Simulate the user scrolling down past the 300px threshold.
    // We programmatically set the scroll position...
    $(window).scrollTop(301);
    // ...and then fire the 'scroll' event that our script is listening for.
    $(window).trigger('scroll');

    // ASSERT: The 'top' property should now be '0px', making the navbar visible.
    expect(stickyNav.css('top')).toBe('0px');
  });
});
```
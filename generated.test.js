```javascript
import { test, expect } from '@playwright/test';
import path from 'path';

// Define the path to the local HTML file
const pageURL = `file://${path.resolve(__dirname, 'source code/index.html')}`;

test.describe('Hero Carousel Functionality', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the local HTML file before each test
    await page.goto(pageURL);
    // Wait for the initial loading spinner to disappear to ensure the page is ready
    await expect(page.locator('#spinner')).not.toBeVisible({ timeout: 15000 });
    // Also wait for the carousel itself to be visible
    await expect(page.locator('.header-carousel')).toBeVisible();
  });

  test("Confirm the main hero carousel automatically transitions between slides and that the 'Join Now' and 'Read More' buttons are present and clickable.", async ({ page }) => {
    // Step 1: Verify the first slide is active and its buttons are present and clickable.
    
    // Locate the first slide's heading to confirm it's visible initially.
    const firstSlideHeading = page.getByRole('heading', { name: 'The Best Online Learning Platform' });
    await expect(firstSlideHeading).toBeVisible({ timeout: 5000 });
    
    // Find the currently active carousel item.
    const activeSlide = page.locator('.owl-carousel-item.active');

    // Verify the "Read More" button is visible and enabled on the active slide.
    const readMoreButton = activeSlide.getByRole('link', { name: 'Read More' });
    await expect(readMoreButton).toBeVisible();
    await expect(readMoreButton).toBeEnabled();
    
    // Verify the "Join Now" button is visible and enabled on the active slide.
    const joinNowButton = activeSlide.getByRole('link', { name: 'Join Now' });
    await expect(joinNowButton).toBeVisible();
    await expect(joinNowButton).toBeEnabled();

    // Step 2: Verify the carousel transitions to the second slide automatically.
    
    // Locate the second slide's heading.
    const secondSlideHeading = page.getByRole('heading', { name: 'Get Educated Online From Your Home' });

    // Wait for the second slide's heading to become visible. This confirms the auto-transition.
    // Owl Carousel's default autoplay speed is 5 seconds. We'll use a longer timeout to be safe.
    await expect(secondSlideHeading).toBeVisible({ timeout: 10000 });

    // Step 3: Verify the buttons on the newly active second slide are also present and clickable.

    // Re-locate the active slide, which should now be the second one.
    const secondActiveSlide = page.locator('.owl-carousel-item.active');
    
    // Verify the "Read More" button is visible and enabled on the new active slide.
    const secondReadMoreButton = secondActiveSlide.getByRole('link', { name: 'Read More' });
    await expect(secondReadMoreButton).toBeVisible();
    await expect(secondReadMoreButton).toBeEnabled();

    // Verify the "Join Now" button is visible and enabled on the new active slide.
    const secondJoinNowButton = secondActiveSlide.getByRole('link', { name: 'Join Now' });
    await expect(secondJoinNowButton).toBeVisible();
    await expect(secondJoinNowButton).toBeEnabled();
    
    // Finally, confirm the first slide's heading is no longer visible to ensure the transition is complete.
    await expect(firstSlideHeading).not.toBeVisible();
  });

});
```
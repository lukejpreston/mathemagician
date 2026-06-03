import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('can generate a math drill', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Arcane Tactical Drills' })).toBeVisible();
  
  // Enlist a new mathemagician
  await page.fill('input[placeholder="New Recruit Name..."]', 'Merlin');
  await page.click('button:has-text("Enlist")');
  
  // Start drill
  await page.click('button:has-text("INITIATE MANEUVER")');
  
  // Verify Tactical Scroll is visible
  await expect(page.getByRole('heading', { name: 'Tactical Scroll' })).toBeVisible();
  await expect(page.locator('text=Recruit: Merlin')).toBeVisible();
});

test('can record results', async ({ page }) => {
  // Enlist and start
  await page.fill('input[placeholder="New Recruit Name..."]', 'Gandalf');
  await page.click('button:has-text("Enlist")');
  await page.click('button:has-text("INITIATE MANEUVER")');
  
  // Fill results
  await page.fill('label:has-text("Precision Score") + input', '15');
  await page.fill('label:has-text("Time Taken") + input', '45');
  await page.click('button:has-text("Save to Campaign Log")');
  
  await expect(page.locator('text=Maneuver Recorded!')).toBeVisible();
  
  // Check Barracks
  await page.click('button:has-text("The Barracks")');
  await expect(page.locator('text=Personnel Records')).toBeVisible();
  await expect(page.locator('text=15')).toBeVisible();
  await expect(page.locator('text=45')).toBeVisible();
});

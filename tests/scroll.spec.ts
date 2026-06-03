import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('can generate a math scroll', async ({ page }) => {
  await expect(page.getByRole('heading', { name: "The Mathemagician's Grimoire" })).toBeVisible();
  
  // Initiate a new mathemagician
  await page.fill('input[placeholder="New Initiate Name..."]', 'Merlin');
  await page.click('button:text-is("Initiate")');
  
  // Start scroll
  await page.click('button:has-text("MASTER THE SPELL")');
  
  // Verify Arcane Scroll is visible
  await expect(page.getByRole('heading', { name: 'Arcane Scroll' })).toBeVisible();
  await expect(page.locator('text=Magician: Merlin')).toBeVisible();
});

test('can record results', async ({ page }) => {
  // Initiate and start
  await page.fill('input[placeholder="New Initiate Name..."]', 'Gandalf');
  await page.click('button:text-is("Initiate")');
  await page.click('button:has-text("MASTER THE SPELL")');
  
  // Fill results
  await page.fill('label:has-text("Rune Accuracy") + input', '15');
  await page.fill('label:has-text("Time Taken") + input', '45');
  await page.click('button:has-text("Save to Spell Chronicle")');
  
  await expect(page.locator('text=Spell Mastered!')).toBeVisible();
  
  // Check Wizard Tower
  await page.click('button:has-text("The Wizard Tower")');
  await expect(page.locator('text=Magician Chronicles')).toBeVisible();
  await expect(page.locator('text=15')).toBeVisible();
  await expect(page.locator('text=45')).toBeVisible();
});

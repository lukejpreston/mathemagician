# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: scroll.spec.ts >> can generate a math scroll
- Location: tests/scroll.spec.ts:7:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'The Mathemagician\'s Grimoire' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('heading', { name: 'The Mathemagician\'s Grimoire' })

```

```yaml
- banner:
  - img
  - link "Mathemagician":
    - /url: /mathemagician/sanctum
    - heading "Mathemagician" [level=1]
  - link "Wizard Tower":
    - /url: /mathemagician/tower
    - img
    - text: Wizard Tower
  - link "Sanctum":
    - /url: /mathemagician/sanctum
- main:
  - heading "Arcane Elements" [level=2]:
    - img
    - text: Arcane Elements
  - button "+"
  - button "-"
  - button "×"
  - button "÷"
  - heading "Rune Strength" [level=2]:
    - img
    - text: Rune Strength
  - text: Min Power
  - spinbutton: "0"
  - text: Max Power
  - spinbutton: "10"
  - heading "Scroll Length" [level=2]:
    - img
    - text: Scroll Length
  - text: Total Runes
  - slider: "20"
  - text: "20"
  - heading "Select Mathemagician" [level=2]:
    - img
    - text: Select Mathemagician
  - combobox:
    - option "-- Choose Initiate --" [selected]
  - textbox "New Initiate Name..."
  - button "Initiate"
  - button "MASTER THE SPELL":
    - img
    - text: MASTER THE SPELL
    - img
- contentinfo:
  - link "About":
    - /url: /mathemagician/about
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.beforeEach(async ({ page }) => {
  4  |   await page.goto('/');
  5  | });
  6  | 
  7  | test('can generate a math scroll', async ({ page }) => {
> 8  |   await expect(page.getByRole('heading', { name: "The Mathemagician's Grimoire" })).toBeVisible();
     |                                                                                     ^ Error: expect(locator).toBeVisible() failed
  9  |   
  10 |   // Initiate a new mathemagician
  11 |   await page.fill('input[placeholder="New Initiate Name..."]', 'Merlin');
  12 |   await page.click('button:text-is("Initiate")');
  13 |   
  14 |   // Start scroll
  15 |   await page.click('button:has-text("MASTER THE SPELL")');
  16 |   
  17 |   // Verify Arcane Scroll is visible
  18 |   await expect(page.getByRole('heading', { name: 'Arcane Scroll' })).toBeVisible();
  19 |   await expect(page.locator('text=Magician: Merlin')).toBeVisible();
  20 | });
  21 | 
  22 | test('can record results', async ({ page }) => {
  23 |   // Initiate and start
  24 |   await page.fill('input[placeholder="New Initiate Name..."]', 'Gandalf');
  25 |   await page.click('button:text-is("Initiate")');
  26 |   await page.click('button:has-text("MASTER THE SPELL")');
  27 |   
  28 |   // Fill results
  29 |   await page.fill('label:has-text("Rune Accuracy") + input', '15');
  30 |   await page.fill('label:has-text("Time Taken") + input', '45');
  31 |   await page.click('button:has-text("Save to Spell Chronicle")');
  32 |   
  33 |   await expect(page.locator('text=Spell Mastered!')).toBeVisible();
  34 |   
  35 |   // Check Wizard Tower
  36 |   await page.click('button:has-text("The Wizard Tower")');
  37 |   await expect(page.locator('text=Magician Chronicles')).toBeVisible();
  38 |   await expect(page.locator('text=15')).toBeVisible();
  39 |   await expect(page.locator('text=45')).toBeVisible();
  40 | });
  41 | 
```
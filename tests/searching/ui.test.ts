import { test, expect } from '@playwright/test'
const base_url = process.env.base_url

test.describe('Mars Airlines: Links back to home', async () => {
  test.beforeEach(async ({ page }) => {
    // open page
    await page.goto(`${base_url}`)

    // Ensure the landing page is ready
    await expect(
      page.getByRole('heading', { name: 'Welcome to MarsAir!' })
    ).toBeVisible()

    await expect(
      page.getByRole('heading', {
        name: 'Book a ticket to the red planet now!',
      })
    ).toBeVisible()
  })

  test('Click "Back" button on the search result window', async ({ page }) => {
    // Enter the valid Departing and Returning date
    await page.getByLabel('Departing').selectOption('0')
    await page.getByLabel('Returning').selectOption('0')
    await page.getByLabel('Promotional Code').focus()
    await page.getByLabel('Promotional Code').fill('ABC')
    await page.getByRole('button', { name: 'Search' }).click()

    await expect(
      page.getByRole('heading', { name: 'Search Results' })
    ).toBeVisible()
    await expect(
      page.getByText('Sorry, there are no more seats available.')
    ).toBeVisible()

    await page.getByRole('link', { name: 'Back' }).click()

    await expect(
      page.getByRole('heading', { name: 'Welcome to MarsAir!' })
    ).toBeVisible()

    await expect(
      page.getByRole('heading', {
        name: 'Book a ticket to the red planet now!',
      })
    ).toBeVisible()
  })
})

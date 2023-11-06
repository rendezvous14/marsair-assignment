import { test, expect } from '@playwright/test'
import { HomePage } from '../../src/pages/home.page'

test.describe.parallel('Mars Airlines: Links back to home', async () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page)
    await homePage.goToHomePage()
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

  test('Click the "Mars Air" Logo on search result page', async ({ page }) => {
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

    // click on logo
    await page.getByRole('link', { name: 'MarsAir' }).click()

    await expect(
      page.getByRole('heading', { name: 'Welcome to MarsAir!' })
    ).toBeVisible()

    await expect(
      page.getByRole('heading', {
        name: 'Book a ticket to the red planet now!',
      })
    ).toBeVisible()
  })

  test('Click the back navigation on the browswer', async ({ page }) => {
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

    // click on logo
    await page.goBack()

    await expect(
      page.getByRole('heading', { name: 'Welcome to MarsAir!' })
    ).toBeVisible()

    await expect(
      page.getByRole('heading', {
        name: 'Book a ticket to the red planet now!',
      })
    ).toBeVisible()
  })

  test('Click the "Mars Air" Logo on home page', async ({ page }) => {
    // click on logo
    await page.getByRole('link', { name: 'MarsAir' }).click()

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

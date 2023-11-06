import { test, expect } from '@playwright/test'
const base_url = process.env.base_url

test('has title', async ({ page }) => {
  // open page
  await page.goto(`${base_url}`)

  await expect(
    page.getByRole('heading', { name: 'Welcome to MarsAir!' })
  ).toBeVisible()

  await expect(
    page.getByRole('heading', { name: 'Book a ticket to the red planet now!' })
  ).toBeVisible()

  await page.getByLabel('Departing').selectOption('0')
  await page.getByLabel('Returning').selectOption('0')
  await page.getByLabel('Promotional Code').focus()
  await page.getByLabel('Promotional Code').fill('ABC')
  await page.getByRole('button', { name: 'Search' }).click()
  await page.getByRole('heading', { name: 'Search Results' }).click()
  await expect(
    page.getByText('Sorry, there are no more seats available.')
  ).toBeVisible()

  await page.getByRole('link', { name: 'Back' }).click()

  await expect(
    page.getByRole('heading', { name: 'Welcome to MarsAir!' })
  ).toBeVisible()

  await expect(
    page.getByRole('heading', { name: 'Book an ticket to the red planet now!' })
  ).toBeVisible()
})

// test('open the website', async ({ page }) => {
// await page.goto(`${base_url}`)
// // Click the get started link.
// await page.getByRole('link', { name: 'Get started' }).click()
// // Expects page to have a heading with the name of Installation.
// await expect(
//   page.getByRole('heading', { name: 'Installation' })
// ).toBeVisible()
// })

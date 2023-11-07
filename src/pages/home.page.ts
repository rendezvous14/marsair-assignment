import { expect, type Locator, type Page } from '@playwright/test'

export class HomePage {
  readonly page: Page
  readonly getFirstHeading: Locator
  readonly getSecondHeading: Locator
  readonly getDepartingOptions: Locator
  readonly getReturningOptions: Locator
  readonly getPromotionalInput: Locator
  readonly getSearchButton: Locator
  readonly getSearchResultLogo: Locator
  readonly getPromotionInput: Locator

  constructor(page: Page) {
    this.page = page
    this.getFirstHeading = page.getByRole('heading', {
      name: 'Welcome to MarsAir!',
    })
    this.getSecondHeading = page.getByRole('heading', {
      name: 'Book a ticket to the red planet now!',
    })
    this.getDepartingOptions = page.getByLabel('Departing')
    this.getReturningOptions = page.getByLabel('Returning')
    this.getPromotionalInput = page.getByLabel('Promotional Code')
    this.getSearchButton = page.getByRole('button', { name: 'Search' })
    this.getSearchResultLogo = page.getByRole('link', { name: 'MarsAir' })

    this.getPromotionInput = page.getByLabel('Promotional Code')
  }

  async goToHomePage() {
    // goto home page
    const base_url = process.env.base_url as string
    await this.page.goto(base_url)
  }

  async homePageDisplays() {
    // Ensure the landing page is ready
    await expect(this.getFirstHeading).toBeVisible()
    await expect(this.getSecondHeading).toBeVisible()
  }

  async fillInSearchForm(dpOption: string = '', rtOption: string = '') {
    await this.getDepartingOptions.selectOption(dpOption)
    await this.getReturningOptions.selectOption(rtOption)
  }

  async clickSearchButton() {
    await this.getSearchButton.click()
  }

  async clickLogo() {
    await this.getSearchResultLogo.click()
  }

  async fillInPromotionCode(code: string = '') {
    await this.getPromotionalInput.fill(code)
  }
}

// await page.getByLabel('Departing').selectOption('0')
// await page.getByLabel('Returning').selectOption('0')
// await page.getByLabel('Promotional Code').focus()
// await page.getByLabel('Promotional Code').fill('ABC')
// await page.getByRole('button', { name: 'Search' }).click()

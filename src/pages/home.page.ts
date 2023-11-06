import { expect, type Locator, type Page } from '@playwright/test'

export class HomePage {
  readonly page: Page
  readonly getFirstHeading: Locator
  readonly getSecondHeading: Locator

  constructor(page: Page) {
    this.page = page
    this.getFirstHeading = page.getByRole('heading', {
      name: 'Welcome to MarsAir!',
    })
    this.getSecondHeading = page.getByRole('heading', {
      name: 'Book a ticket to the red planet now!',
    })
  }

  async goToHomePage() {
    // goto home page
    const base_url = process.env.base_url as string
    await this.page.goto(base_url)
    // Ensure the landing page is ready
    await expect(this.getFirstHeading).toBeVisible()
    await expect(this.getSecondHeading).toBeVisible()
  }
}

import { expect, type Locator, type Page } from '@playwright/test'

export class SearchResultPage {
  readonly page: Page
  readonly getSearchResultHeading: Locator
  readonly getSearchResultBackButton: Locator
  readonly getSearchResultLogo: Locator

  constructor(page: Page) {
    this.page = page
    this.getSearchResultHeading = page.getByRole('heading', {
      name: 'Search Results',
    })
    this.getSearchResultBackButton = page.getByRole('link', { name: 'Back' })
    this.getSearchResultLogo = page.getByRole('link', { name: 'MarsAir' })
  }

  async searchResultDisplays() {
    // Ensure the landing page is ready
    await expect(this.getSearchResultHeading).toBeVisible()
    await expect(this.getSearchResultBackButton).toBeVisible()
  }

  async clickBackButton() {
    await this.getSearchResultBackButton.click()
  }

  async clickLogo() {
    await this.getSearchResultLogo.click()
  }
}

import { expect, type Locator, type Page } from '@playwright/test'

export class SearchResultPage {
  readonly page: Page
  readonly getSearchResultHeading: Locator
  readonly getSearchResultBackButton: Locator
  readonly getSearchResultLogo: Locator
  readonly getSearchResultSeatsAvailable: Locator
  readonly getSearchResultSeatsUnavailable: Locator
  readonly getSearchResultInvalidSchedule: Locator
  readonly getSearchResultBookingInfo: Locator

  constructor(page: Page) {
    this.page = page
    this.getSearchResultHeading = page.getByRole('heading', {
      name: 'Search Results',
    })
    this.getSearchResultBackButton = page.getByRole('link', { name: 'Back' })
    this.getSearchResultLogo = page.getByRole('link', { name: 'MarsAir' })
    this.getSearchResultSeatsAvailable = page.getByText('Seats available!')
    this.getSearchResultSeatsUnavailable = page.getByText(
      'Sorry, there are no more seats available.'
    )
    this.getSearchResultInvalidSchedule = page.getByText(
      'Unfortunately, this schedule is not possible. Please try again.'
    )
    this.getSearchResultBookingInfo = page.getByText(
      'Call now on 0800 MARSAIR to book!'
    )
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

  async seatsAvailableInfoDisplays() {
    await expect(this.getSearchResultSeatsAvailable).toBeVisible()
    await expect(this.getSearchResultBookingInfo).toBeVisible()
  }

  async seatsUnavailableInfoDisplays() {
    await expect(this.getSearchResultSeatsUnavailable).toBeVisible()
  }

  async invalidScheduleInfoDisplay() {
    await expect(this.getSearchResultInvalidSchedule).toBeVisible()
  }
}

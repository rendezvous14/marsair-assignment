import { test, expect } from '@playwright/test'
import { HomePage } from '../../src/pages/home.page'
import { SearchResultPage } from '../../src/pages/searchResult.page'
//constants for dropdown options
import { searchOptions } from '../../src/constants/searchOptions'

test.describe.parallel('Basic search workflow', async () => {
  const options = searchOptions // create obj options for testing

  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page)
    // go to home page
    await homePage.goToHomePage()
    // ensure the home page displays
    await homePage.homePageDisplays()
  })

  test('Users can view reservation information when seats are available.', async ({
    page,
  }) => {
    const homePage = new HomePage(page)
    const searchResultPage = new SearchResultPage(page)

    // get options value
    const dpOption = options['July'].toString()
    const rtOption = options['December (two years from now)'].toString()

    // fil in the search form
    await homePage.fillInSearchForm(dpOption, rtOption)
    await homePage.clickSearchButton()

    // expect displays seats available info
    await searchResultPage.searchResultDisplays()
    await searchResultPage.seatsAvailableInfoDisplays()
  })

  test('Users can see no more seats available when seats are unavailable.', async ({
    page,
  }) => {
    const homePage = new HomePage(page)
    const searchResultPage = new SearchResultPage(page)

    // get options value
    const dpOption = options['December'].toString()
    const rtOption = options['July (two years from now)'].toString()

    // fil in the search form
    await homePage.fillInSearchForm(dpOption, rtOption)
    await homePage.clickSearchButton()

    // expect displays seats unavailable info
    await searchResultPage.searchResultDisplays()
    await searchResultPage.seatsUnavailableInfoDisplays()
  })

  test('Users can this schedule is not possible message', async ({ page }) => {
    const homePage = new HomePage(page)
    const searchResultPage = new SearchResultPage(page)

    // get options value
    const dpOption = options['July (next year)'].toString()
    const rtOption = options['December (next year)'].toString()

    // fil in the search form
    await homePage.fillInSearchForm(dpOption, rtOption)
    await homePage.clickSearchButton()

    // expect displays seats unavailable info
    await searchResultPage.searchResultDisplays()
    await searchResultPage.invalidScheduleInfoDisplay()
  })
})

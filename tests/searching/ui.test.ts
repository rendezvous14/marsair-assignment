import { test, expect } from '@playwright/test'
import { HomePage } from '../../src/pages/home.page'
import { SearchResultPage } from '../../src/pages/searchResult.page'

test.describe.parallel('Mars Airlines: Links back to home', async () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page)
    // go to home page
    await homePage.goToHomePage()
    // ensure the home page displays
    await homePage.homePageDisplays()
  })

  test('Click "Back" button on the search result window', async ({ page }) => {
    const homePage = new HomePage(page)
    const searchResultPage = new SearchResultPage(page)

    // fil in the search form
    await homePage.fillInSearchForm('july', 'december')
    await homePage.clickSearchButton()

    // ensure the search result page displays
    await searchResultPage.searchResultDisplays()
    // click back button
    await searchResultPage.clickBackButton()

    // ensure the home page displays
    await homePage.homePageDisplays()
  })

  test('Click the "Mars Air" Logo on search result page', async ({ page }) => {
    const homePage = new HomePage(page)
    const searchResultPage = new SearchResultPage(page)

    // fil in the search form
    await homePage.fillInSearchForm('july', 'december')
    await homePage.clickSearchButton()

    // ensure the search result page displays
    await searchResultPage.searchResultDisplays()
    // click on logo
    await searchResultPage.clickLogo()

    // ensure the home page displays
    await homePage.homePageDisplays()
  })

  test('Click the back navigation on the browswer', async ({ page }) => {
    const homePage = new HomePage(page)
    const searchResultPage = new SearchResultPage(page)

    // fil in the search form
    await homePage.fillInSearchForm('july', 'december')
    await homePage.clickSearchButton()

    // ensure the search result page displays
    await searchResultPage.searchResultDisplays()
    // click back navigation on browser
    await page.goBack()

    // ensure the home page displays
    await homePage.homePageDisplays()
  })

  test('Click the "Mars Air" Logo on home page', async ({ page }) => {
    const homePage = new HomePage(page)
    // click on logo
    await homePage.clickLogo()
    // ensure the home page displays
    await homePage.homePageDisplays()
  })
})

import { test, expect } from '@playwright/test'
import { HomePage } from '../../src/pages/home.page'
import { SearchResultPage } from '../../src/pages/searchResult.page'
//constants for dropdown options
import { searchOptions } from '../../src/constants/searchOptions'

test.describe.parallel('Promotion codes', async () => {
  const options = searchOptions // create obj options for testing

  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page)
    // go to home page
    await homePage.goToHomePage()
    // ensure the home page displays
    await homePage.homePageDisplays()
  })

  test('The search result should have a "Promotional code [sample code] used: 30% discount!" message.', async ({
    page,
  }) => {
    const homePage = new HomePage(page)
    const searchResultPage = new SearchResultPage(page)
    // tested promotion code for 30%
    const code = 'AF3-FJK-418'
    const percentage = '30%'

    // get options value
    const dpOption = options['July'].toString()
    const rtOption = options['December (two years from now)'].toString()

    // fil in the search form
    await homePage.fillInSearchForm(dpOption, rtOption)

    // fill in a promotion code
    await homePage.fillInPromotionCode(code)

    // click search button
    await homePage.clickSearchButton()

    // expect displays seats available info
    await searchResultPage.searchResultDisplays()
    await searchResultPage.seatsAvailableInfoDisplays()

    // expect displays promotion code and discount % correctly
    const promotionInfo = await searchResultPage.promotionText()
    // Define a regular expression pattern to match the code and discount percentage
    const regex = new RegExp(
      `Promotional code (${code}) used: (${percentage} discount!)`
    )
    const match = promotionInfo.match(regex)
    expect(match).toBeTruthy()
  })

  test('The search result should have a "Sorry, code [invalid promo code] is not valid" message.', async ({
    page,
  }) => {
    const homePage = new HomePage(page)
    const searchResultPage = new SearchResultPage(page)
    // tested promotion code
    const code = 'JJ5-OPQ-320'

    // get options value
    const dpOption = options['July'].toString()
    const rtOption = options['December (two years from now)'].toString()

    // fil in the search form
    await homePage.fillInSearchForm(dpOption, rtOption)

    // fill in a promotion code
    await homePage.fillInPromotionCode(code)

    // click search button
    await homePage.clickSearchButton()

    // expect displays seats available info
    await searchResultPage.searchResultDisplays()
    await searchResultPage.seatsAvailableInfoDisplays()

    // expect displays promotion code and discount % correctly
    const promotionInfo = await searchResultPage.promotionText()
    // Define a regular expression pattern to match the code and discount percentage
    const regex = new RegExp(`Sorry, code (${code}) is not valid`)
    const match = promotionInfo.match(regex)
    expect(match).toBeTruthy()
  })
})

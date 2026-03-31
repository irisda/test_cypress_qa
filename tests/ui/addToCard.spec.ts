import loginPage from '../../pages/LoginPage'
import inventoryPage from '../../pages/InventoryPage'

describe('Task 1 — UI Flow & Network Validation', () => {
  beforeEach(() => {
    cy.intercept('GET', '/').as('pageLoad')

    loginPage.visit()
    loginPage.login(Cypress.env('username'), Cypress.env('password'))
    cy.get(inventoryPage.pageTitle).should('have.text', 'Products')
  })

  it('adds a product to the cart and verifies the badge count is 1', () => {
    // Verify at least one product is visible
    inventoryPage.verifyProductsVisible()

    // Add the first item to the cart
    inventoryPage.addFirstProductToCart()

    // Verify the cart badge shows 1 item
    inventoryPage.getCartBadge('1')
  })

  it('intercepts page load request and validates product image response', () => {
    // Validate the page load response
    cy.wait('@pageLoad').then((interception) => {
      // Validate response status code is 200
      expect(interception.response?.statusCode).to.eq(200)

      // Validate content-type value includes text/html
      expect(interception.response?.headers['content-type']).to.include('text/html')

      // Validate response headers contain required properties
      expect(interception.response?.headers).to.include.keys([
        'content-type',
        'content-length',
        'access-control-allow-origin',
        'connection',
      ])

      // Validate response body is not empty and contains app content
      expect(interception.response?.body).to.be.a('string').and.not.be.empty
      expect(interception.response?.body).to.include('Swag Labs')
    })

    // Get the product image URL from the DOM and validate it via cy.request
    cy.get('[data-test="inventory-item-sauce-labs-backpack-img"]')
      .invoke('attr', 'src')
      .then((src) => {
        cy.request(src as string).then((res) => {
          expect(res.status).to.eq(200)
          expect(res.headers['content-type']).to.include('image/')
        })
      })
  })
})

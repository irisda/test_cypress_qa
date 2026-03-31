class InventoryPage {
  readonly addToCartButton = '[data-test^="add-to-cart"]'
  readonly cartBadge = '[data-test="shopping-cart-badge"]'
  readonly cartLink = '[data-test="shopping-cart-link"]'
  readonly inventoryItem = '[data-test="inventory-item"]'
  readonly pageTitle = '.title'

  verifyProductsVisible(): void {
    cy.get(this.inventoryItem).should('be.visible')
    cy.get(this.inventoryItem).should('have.length.greaterThan', 0)
  }

  addFirstProductToCart(): void {
    cy.get(this.addToCartButton).should('be.visible')
    cy.get(this.addToCartButton).first().click()
  }

  getCartBadge(expectedCount: string): void {
    cy.get(this.cartBadge).should('be.visible')
    cy.get(this.cartBadge).should('have.text', expectedCount)
  }
}
export default new InventoryPage()

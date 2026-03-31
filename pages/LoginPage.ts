class LoginPage {
  readonly usernameInput = '[data-test="username"]'
  readonly passwordInput = '[data-test="password"]'
  readonly loginButton = '[data-test="login-button"]'
  readonly errorMessage = '[data-test="error"]'
  // saucedemo does not expose a data-test for the logo — class is the most stable alternative
  readonly pageTitle = '.login_logo'

  visit(): void {
    cy.visit('/')
  }

  fillUsername(value: string): void {
    cy.get(this.usernameInput).should('be.visible')
    cy.get(this.usernameInput).clear().type(value)
  }

  fillPassword(value: string): void {
    cy.get(this.passwordInput).should('be.visible')
    cy.get(this.passwordInput).clear().type(value)
  }

  submit(): void {
    cy.get(this.loginButton).should('exist')
    cy.get(this.loginButton).click()
  }

  login(username: string, password: string): void {
    this.fillUsername(username)
    this.fillPassword(password)
    this.submit()
  }
}

export default new LoginPage()

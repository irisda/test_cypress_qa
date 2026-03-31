import type { UsersResponse } from '../../types/userDetails.dto'

declare global {
  namespace Cypress {
    interface Chainable {
      getUsers(page: number): Chainable<Response<UsersResponse>>
    }
  }
}

export {}

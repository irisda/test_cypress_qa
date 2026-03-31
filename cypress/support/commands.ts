import type { UsersResponse } from '../../types/userDetails.dto'

Cypress.Commands.add('getUsers', (page: number) => {
  return cy.env(['reqresBaseUrl', 'reqresApiKey']).then(
    ({ reqresBaseUrl, reqresApiKey }) => {
      return cy.request<UsersResponse>({
        method: 'GET',
        url: `${reqresBaseUrl}/api/users`,
        failOnStatusCode: false,
        qs: { page },
        headers: {
          'x-api-key': reqresApiKey,
        },
      })
    }
  )
})

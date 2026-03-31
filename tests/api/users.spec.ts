describe('Task 3 — API Test: GET /api/users - Validate paginated users list', () => {
  it('should return status 200 with a valid users array for page 2', () => {
    const page = 2;
    cy.getUsers(page).then((response) => {
      // Validate status code is 200
      expect(response.status).to.eq(200)

      // Validate response contains 'data' array with at least one user
      expect(response.body.data).to.be.an('array').and.have.length.greaterThan(0)

      // Validate each user has required properties
      response.body.data.forEach((user) => {
        expect(user).to.include.all.keys('id', 'first_name', 'last_name', 'email')
      })
    })
  })
})

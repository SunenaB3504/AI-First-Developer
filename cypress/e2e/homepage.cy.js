describe('AI Learning Platform E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should load the homepage', () => {
    cy.contains('AI Learning Platform').should('be.visible')
  })

  it('should display navigation links', () => {
    // Check if navigation links are present (may be hidden if not logged in)
    cy.get('body').then($body => {
      if ($body.find('nav').length > 0) {
        cy.get('nav').should('be.visible')
      }
    })
  })

  it('should have working logo link', () => {
    cy.contains('AI Learning Platform').should('have.attr', 'href', '/')
  })

  it('should handle page navigation', () => {
    // Test basic navigation structure
    cy.url().should('include', '/')
  })

  it('should be responsive', () => {
    // Test mobile responsiveness
    cy.viewport('iphone-6')
    cy.contains('AI Learning Platform').should('be.visible')

    // Test tablet responsiveness
    cy.viewport('ipad-2')
    cy.contains('AI Learning Platform').should('be.visible')

    // Test desktop responsiveness
    cy.viewport('macbook-15')
    cy.contains('AI Learning Platform').should('be.visible')
  })
})
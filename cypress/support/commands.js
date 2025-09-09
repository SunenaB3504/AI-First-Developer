// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

/// <reference types="cypress" />

// Custom command to login user
Cypress.Commands.add('login', (email = 'test@example.com', password = 'password123') => {
  cy.session([email, password], () => {
    // Custom login logic here
    cy.visit('/')
    // Add login steps when authentication is implemented
  })
})

// Custom command to complete a lesson
Cypress.Commands.add('completeLesson', (lessonId) => {
  cy.visit(`/learn/${lessonId}`)
  // Add lesson completion logic
})

// Custom command to check navigation
Cypress.Commands.add('checkNavigation', () => {
  cy.get('[data-cy="nav-learn"]').should('be.visible')
  cy.get('[data-cy="nav-portfolio"]').should('be.visible')
  cy.get('[data-cy="nav-profile"]').should('be.visible')
  cy.get('[data-cy="nav-analytics"]').should('be.visible')
})
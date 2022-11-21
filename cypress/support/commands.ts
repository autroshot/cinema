/// <reference types="cypress" />

Cypress.Commands.add('adminLogin', () => {
  cy.session(
    'admin',
    () => {
      cy.visit('admin');

      cy.get('#input-username-for-credentials-provider').type('admin');
      cy.get('#input-password-for-credentials-provider').type('1234');
      cy.get('button[type="submit"]').click();

      cy.url().should('eq', 'http://localhost:3000/admin');
    },
    {
      validate() {
        cy.visit('admin');
        cy.contains('admin님이 로그인되었습니다.');
      },
    }
  );
});

declare global {
  namespace Cypress {
    interface Chainable {
      adminLogin(): Chainable<void>;
    }
  }
}

export {};

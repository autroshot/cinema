describe('페이지 방문', () => {
  it('홈페이지', () => {
    cy.visit('/');
  });
  it('스페셜관 인덱스', () => {
    cy.visit('/');
    cy.contains('스페셜관').click();
    cy.contains('홈').click();
    cy.url().should('include', '/special-screen');

    cy.visit('/');
    cy.contains('더보기 >').click();
    cy.url().should('include', '/special-screen');
  });
});

export {};

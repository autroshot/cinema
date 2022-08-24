describe('관리자 페이지 방문', () => {
  it('영화관', () => {
    cy.visit('/');
    cy.contains('관리자').click();
    cy.contains('관리자 인덱스 페이지');
    cy.contains('영화관').click();
    cy.get('[data-cy="title"]').should('have.text', '영화관 목록');

    cy.get('[data-cy="theaters"]').contains('월드타워').click();
    cy.get('[data-cy="title"]').should('have.text', '영화관 상세');

    cy.get('button').contains('취소').click();
    cy.get('[data-cy="title"]').should('have.text', '영화관 목록');

    cy.get('button').contains('영화관 등록').click();
    cy.get('[data-cy="title"]').should('have.text', '영화관 등록');
  });
});
describe('영화관 CRUD', () => {
  it('영화관 CR');
});

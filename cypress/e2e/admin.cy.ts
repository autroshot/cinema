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
  const THEATER_DUMMY = {
    name: '테스트 이름',
    street_address: '서울특별시 중구 세종대로 110',
    google_maps_place_id: 'ChIJ81IZg_KifDURyA2TiacuQ3w',
  };

  it('영화관 CR', () => {
    cy.visit('http://localhost:3000/admin/theaters/create');
    cy.contains('name').click().type(THEATER_DUMMY.name);
  });
});

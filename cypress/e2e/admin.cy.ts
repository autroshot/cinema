import { RequestData } from 'pages/api/test/theaters/deleteByName';

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

const THEATER_DUMMY = {
  name: '테스트 영화관',
  street_address: '서울특별시 중구 세종대로 110',
  google_maps_place_id: 'ChIJ81IZg_KifDURyA2TiacuQ3w',
};
describe('영화관 CRUD', () => {
  const duplicatedName = '월드타워';

  beforeEach(() => {
    const body: RequestData = { name: THEATER_DUMMY.name };
    cy.request('DELETE', '/api/test/theaters/deleteByName', body);
  });

  it.only('영화관 C', () => {
    cy.visit('http://localhost:3000/admin/theaters/create');
    cy.contains('name').click().type(duplicatedName);
    cy.contains('google_maps_place_id')
      .click()
      .type(THEATER_DUMMY.google_maps_place_id);
    cy.get('button').contains('등록').click();
    cy.get('[data-cy="alert"]').should(
      'include.text',
      '필숫값이 비어 있습니다.'
    );

    cy.contains('street_address').click().type(THEATER_DUMMY.street_address);
    cy.get('button').contains('등록').click();
    cy.get('[data-cy="alert"]').should('include.text', '고유 제약 조건 오류');

    cy.contains('name')
      .click()
      .type('{selectAll}{del}')
      .type(THEATER_DUMMY.name);
    cy.get('button').contains('등록').click();
    cy.contains('등록이 완료되었습니다.');
    cy.contains('목록으로 돌아가기').click();

    cy.get('[data-cy="theaters"]').contains(THEATER_DUMMY.name);
  });
});

export {};

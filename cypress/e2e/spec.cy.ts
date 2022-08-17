describe('페이지 방문', () => {
  it('홈페이지', () => {
    cy.visit('/');
  });

  it('스페셜관 인덱스', () => {
    cy.visit('/');
    cy.contains('스페셜관').click();
    cy.contains('홈').click();
    cy.contains('영화의 순간을 더욱 특별하게');

    cy.visit('/');
    cy.contains('더보기 >').click();
    cy.contains('영화의 순간을 더욱 특별하게');
  });

  it('스페셜관 컬러리움', () => {
    cy.visit('/');
    cy.contains('스페셜관').click();
    cy.contains('컬러리움').click();
    cy.contains('국내 최초 14M 대형 LED 시네마');

    cy.visit('/');
    cy.contains('스페셜관').click();
    cy.contains('홈').click();
    cy.get('[data-cy="specialScreenLinks"]').contains('컬러리움').click();
    cy.contains('국내 최초 14M 대형 LED 시네마');

    cy.visit('/');
    cy.get('[alt="컬러리움"]').click();
    cy.contains('국내 최초 14M 대형 LED 시네마');
  });
});

export {};

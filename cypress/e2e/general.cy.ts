describe('페이지 방문', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('홈페이지 방문', () => {});

  it('스페셜관 인덱스 페이지 네비바로 방문', () => {
    cy.contains('스페셜관').click();
    cy.contains('홈').click();
    cy.contains('영화의 순간을 더욱 특별하게');
  });
  it('스페셜관 인덱스 페이지 홈의 링크로 방문', () => {
    cy.contains('더보기 >').click();
    cy.contains('영화의 순간을 더욱 특별하게');
  });

  it('스페셜관 컬러리움 페이지 네비바로 방문', () => {
    cy.contains('스페셜관').click();
    cy.contains('컬러리움').click();
    cy.contains('국내 최초 14M 대형 LED 시네마');
  });
  it('스페셜관 컬러리움 페이지 홈의 링크로 방문', () => {
    cy.get('[alt="컬러리움"]').click();
    cy.contains('국내 최초 14M 대형 LED 시네마');
  });
  it('스페셜관 컬러리움 페이지 스페셜관 인덱스로 방문', () => {
    cy.contains('스페셜관').click();
    cy.contains('홈').click();
    cy.get('[data-cy="specialScreenLinks"]').contains('컬러리움').click();
    cy.contains('국내 최초 14M 대형 LED 시네마');
  });

  it('영화관 상세', () => {
    cy.contains('영화관').click();
    cy.contains('월드타워').click();

    cy.get('[data-cy="title"]').should('have.text', '월드타워');
    cy.contains('서울 송파구 올림픽로 300 (신천동) 5층-11층');

    cy.contains('대중교통 안내').click();
    cy.contains('[8호선 잠실역]');
    cy.contains('[지선버스]');
    cy.get('.btn-close').click();

    cy.contains('자가용/주차 안내').click();
    cy.contains('롯데시네마월드타워');
    cy.contains('심야 할인 적용');
    cy.get('.btn-close').click();

    cy.contains('지도 보기').click();
    cy.get('.btn-close').click();
  });
});

export {};

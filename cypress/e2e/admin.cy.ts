import type { PostResponseData } from 'pages/api/theaters/index.page';

describe('관리자 페이지 방문', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/admin');
  });

  it('영화관', () => {
    cy.contains('영화관').click();
    cy.get('[data-cy="title"]').should('have.text', '영화관 목록');

    cy.get('[data-cy="theaters"]').contains('월드타워').click();
    cy.get('[data-cy="title"]').should('have.text', '영화관 상세');

    cy.get('button').contains('취소').click();
    cy.get('[data-cy="title"]').should('have.text', '영화관 목록');

    cy.get('button').contains('영화관 등록').click();
    cy.get('[data-cy="title"]').should('have.text', '영화관 등록');
  });

  it('상영관', () => {
    cy.contains('상영관').click();
    cy.get('[data-cy="title"]').should('have.text', '영화관 및 상영관 목록');

    cy.contains('월드타워').click();
    cy.contains('15관');
    cy.contains('상영관 등록').click();
    cy.get('[data-cy="title"]').should('have.text', '상영관 등록');
    cy.contains('취소').click();
    cy.get('[data-cy="title"]').should('have.text', '영화관 및 상영관 목록');
  });
});

const THEATER_DUMMY = {
  name: '테스트 영화관',
  street_address: '서울특별시 중구 세종대로 110',
  google_maps_place_id: 'ChIJ81IZg_KifDURyA2TiacuQ3w',
  bus: '테스트 버스',
  car: '테스트 자가용',
  parking: '테스트 주차',
};
describe('영화관 CRUD', () => {
  const duplicatedName = '월드타워';

  beforeEach(() => {
    cy.exec('npx prisma db seed');
  });

  it('C', () => {
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

  it('R', () => {
    cy.visit('http://localhost:3000/admin/theaters');

    cy.get('[data-cy="theaters"]').contains('월드타워');
    cy.get('[data-cy="theaters"]').contains('수원');
    cy.get('[data-cy="theaters"]').contains('건대입구');

    cy.get('[data-cy="theaters"]').contains('월드타워').click();
    cy.get('[data-cy="title"]').should('have.text', '영화관 상세');
    cy.contains('월드타워');
  });

  it('U', () => {
    cy.visit('http://localhost:3000/admin/theaters/1');
    cy.get('[data-cy="container"]').should(
      'not.include.text',
      '불러오는 중...'
    );

    cy.contains('name').click().type('{selectAll}{del}');
    cy.get('button').contains('수정').click();
    cy.get('[data-cy="alert"]').should(
      'include.text',
      '필숫값이 비어 있습니다.'
    );

    cy.contains('name')
      .click()
      .type('{selectAll}{del}')
      .type(THEATER_DUMMY.name);
    cy.contains('street_address')
      .click()
      .type('{selectAll}{del}')
      .type(THEATER_DUMMY.street_address);
    cy.contains('google_maps_place_id')
      .click()
      .type('{selectAll}{del}')
      .type(THEATER_DUMMY.google_maps_place_id);
    cy.contains('subway').click().type('{selectAll}{del}');
    cy.contains('bus').click().type('{selectAll}{del}').type(THEATER_DUMMY.bus);
    cy.contains('car').click().type('{selectAll}{del}').type(THEATER_DUMMY.car);
    cy.contains('parking')
      .click()
      .type('{selectAll}{del}')
      .type(THEATER_DUMMY.parking);
    cy.get('button').contains('수정').click();

    cy.contains('수정이 완료되었습니다.');
    cy.reload();
    cy.get('[data-cy="title"]').should('have.text', '영화관 상세');
    cy.get('#name').should('have.value', THEATER_DUMMY.name);
    cy.get('#street_address').should(
      'have.value',
      THEATER_DUMMY.street_address
    );
    cy.get('#google_maps_place_id').should(
      'have.value',
      THEATER_DUMMY.google_maps_place_id
    );
    cy.get('#subway').should('have.value', '');
    cy.get('#bus').should('have.value', THEATER_DUMMY.bus);
    cy.get('#car').should('have.value', THEATER_DUMMY.car);
    cy.get('#parking').should('have.value', THEATER_DUMMY.parking);
  });

  it('D', () => {
    cy.request('POST', 'api/theaters', THEATER_DUMMY).then((theater) => {
      const body = theater.body as PostResponseData;
      const id = body.id;

      cy.visit(`/admin/theaters/${id}`);

      cy.get('button').contains('삭제').click();
      cy.contains('삭제 재확인');
      cy.get('[data-cy="confirmButtons"]').contains('삭제').click();
      cy.contains('삭제가 완료되었습니다.');
      cy.contains('목록으로 돌아가기').click();

      cy.get('[data-cy="theaters"]').should(
        'not.contain.text',
        THEATER_DUMMY.name
      );
      cy.visit(`/admin/theaters/${id}`);
      cy.contains('데이터가 없습니다.');
    });
  });
});

describe('상영관 등록 폼', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/admin/screens/4/create');
    cy.get('[data-cy="error"]').should('not.be.visible');
  });

  it('입력된 값이 정수가 아님', () => {
    cy.get('#screenNo').type('1.1');
    cy.get('[data-cy="error"]').should('be.visible');
    cy.get('#screenNo')
      .siblings('[data-cy="error"]')
      .should('have.text', '정수만 가능합니다.');
  });

  it('입력된 값이 음수', () => {
    cy.get('#screenNo').type('-5');
    cy.get('[data-cy="error"]').should('be.visible');
    cy.get('#screenNo')
      .siblings('[data-cy="error"]')
      .should('have.text', '양수만 가능합니다.');
  });
});

export {};

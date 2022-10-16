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
    cy.contains('상영관 등록').should('be.visible');
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
    cy.get('#totalRow').type('-5');
    cy.get('[data-cy="error"]').should('be.visible');
    cy.get('#totalRow')
      .siblings('[data-cy="error"]')
      .should('have.text', '양수만 가능합니다.');
  });

  it('통로 번호에 입력된 값이 1 이하', () => {
    cy.get('[data-cy="addAisleInput"]').click();
    cy.contains('통로 만들기').nextAll('.row').should('have.length', 1);

    cy.contains('통로 만들기').nextAll('.row').eq(0).as('aisleInput');
    cy.get('@aisleInput').type('1');
    cy.get('[data-cy="error"]').should('have.text', '1보다 커야 합니다.');
  });

  it('통로 인풋 추가/삭제', () => {
    cy.contains('통로 만들기').nextAll('.row').should('not.exist');

    cy.get('[data-cy="addAisleInput"]').click();
    cy.get('[data-cy="addAisleInput"]').click();
    cy.get('[data-cy="addAisleInput"]').click();
    cy.contains('통로 만들기').nextAll('.row').as('aisleInputs');
    cy.get('@aisleInputs').should('have.length', 3);

    cy.get('@aisleInputs').eq(0).find('#aisleType').select('column');
    cy.get('@aisleInputs').eq(0).find('#aisleNo').type('2');
    cy.get('@aisleInputs').eq(1).find('#aisleNo').type('3');
    cy.get('@aisleInputs').eq(2).find('#aisleNo').type('4');

    cy.get('@aisleInputs').eq(1).find('[data-cy="deleteAisleInput"]').click();
    cy.get('@aisleInputs').should('have.length', 2);

    cy.get('@aisleInputs').eq(0).find('#aisleType').should('have.value', '2');
    cy.get('@aisleInputs').eq(0).find('#aisleNo').should('have.value', '2');
    cy.get('@aisleInputs').eq(1).find('#aisleType').should('have.value', '1');
    cy.get('@aisleInputs').eq(1).find('#aisleNo').should('have.value', '4');
  });

  it('선택 불가능한 좌석 인풋 추가/삭제', () => {
    cy.wait(1000);
    cy.contains('선택 불가능한 좌석 지정하기')
      .nextAll('.row')
      .should('not.exist');

    cy.get('[data-cy="addUnselectableSeatInput"]').click();
    cy.get('[data-cy="addUnselectableSeatInput"]').click();
    cy.get('[data-cy="addUnselectableSeatInput"]').click();
    cy.get('[data-cy="addUnselectableSeatInput"]').click();
    cy.contains('선택 불가능한 좌석 지정하기')
      .nextAll('.row')
      .as('unselectableSeatInput');
    cy.get('@unselectableSeatInput').should('have.length', 4);

    cy.get('@unselectableSeatInput').eq(0).find('#row').type('1');
    cy.get('@unselectableSeatInput').eq(0).find('#column').type('1');
    cy.get('@unselectableSeatInput').eq(1).find('#row').type('2');
    cy.get('@unselectableSeatInput').eq(1).find('#column').type('2');
    cy.get('@unselectableSeatInput')
      .eq(1)
      .find('#unselectableSeatType')
      .select('unavailable');
    cy.get('@unselectableSeatInput').eq(2).find('#row').type('3');
    cy.get('@unselectableSeatInput').eq(2).find('#column').type('3');
    cy.get('@unselectableSeatInput').eq(3).find('#row').type('4');
    cy.get('@unselectableSeatInput').eq(3).find('#column').type('4');
    cy.get('@unselectableSeatInput')
      .eq(3)
      .find('#unselectableSeatType')
      .select('unavailable');

    cy.get('@unselectableSeatInput')
      .eq(2)
      .find('[data-cy="deleteUnselectableSeatInput"]')
      .click();
    cy.get('@unselectableSeatInput').should('have.length', 3);

    cy.get('@unselectableSeatInput')
      .eq(1)
      .find('[data-cy="deleteUnselectableSeatInput"]')
      .click();
    cy.get('@unselectableSeatInput').should('have.length', 2);

    cy.get('@unselectableSeatInput')
      .eq(0)
      .find('#unselectableSeatType')
      .should('have.value', '1');
    cy.get('@unselectableSeatInput')
      .eq(0)
      .find('#row')
      .should('have.value', '1');
    cy.get('@unselectableSeatInput')
      .eq(0)
      .find('#column')
      .should('have.value', '1');
  });

  it('통로 인풋에 입력된 값이 좌석의 범위를 벗어남', () => {});
  it('선택 불가능한 좌석 인풋에 입력된 값이 좌석의 범위를 벗어남', () => {});
});

export {};

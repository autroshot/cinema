import type { PostResponseData as TheaterPostResponseData } from 'pages/api/theaters/index.page';
import { PostRequestData as ScreenPostRequestData } from 'pages/api/theaters/[theaterId]/screens/index.page';
import { PutRequestData as ScreenPutRequestData } from 'pages/api/theaters/[theaterId]/screens/[screenId].page';

describe.only('관리자 인증', () => {
  it('비인증 접근', () => {
    cy.visit('http://localhost:3000/admin');

    cy.contains('Please sign in to access this page.');
  });

  it('로그인', () => {
    cy.visit('http://localhost:3000');
    cy.contains('관리자').click();

    cy.get('#input-username-for-credentials-provider').type('admin');
    cy.get('#input-password-for-credentials-provider').type('1234');
    cy.get('button[type="submit"]').click();

    cy.contains('admin님이 로그인되었습니다.');
  });
});

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

    cy.contains('수원').click();
    cy.contains('5관');
    cy.get('[data-cy="2-5"]').click();
    cy.get('[data-cy="title"]').should('have.text', '상영관 상세');
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
    cy.get('[data-cy="submit"]').click();
    cy.get('[data-cy="alert"]').should(
      'include.text',
      '필숫값이 비어 있습니다.'
    );

    cy.contains('street_address').click().type(THEATER_DUMMY.street_address);
    cy.get('[data-cy="submit"]').click();
    cy.get('[data-cy="alert"]').should('include.text', '고유 제약 조건 오류');

    cy.contains('name')
      .click()
      .type('{selectAll}{del}')
      .type(THEATER_DUMMY.name);
    cy.get('[data-cy="submit"]').click();
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
    cy.get('[data-cy="update"]').click();
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
    cy.get('[data-cy="update"]').click();

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
      const body = theater.body as TheaterPostResponseData;
      const id = body.id;

      cy.visit(`/admin/theaters/${id}`);

      cy.get('[data-cy="delete"]').click();
      cy.contains('삭제 확인');
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

  it('통로 인풋에 입력된 값이 좌석의 범위를 벗어남', () => {
    cy.get('#totalRow').type('5');
    cy.get('#totalColumn').type('3');
    cy.get('[data-cy="addAisleInput"]').click();
    cy.get('[data-cy="addAisleInput"]').click();
    cy.contains('통로 만들기').nextAll('.row').as('aisleInputs');
    cy.get('@aisleInputs').should('have.length', 2);

    cy.get('@aisleInputs').eq(0).find('#aisleNo').type('5');
    cy.get('@aisleInputs')
      .eq(0)
      .find('[data-cy="error"]')
      .should('have.text', '좌석 행 개수 미만이어야 합니다.');
    cy.get('@aisleInputs').eq(1).find('#aisleType').select('column');
    cy.get('@aisleInputs').eq(1).find('#aisleNo').type('3');
    cy.get('@aisleInputs')
      .eq(1)
      .find('[data-cy="error"]')
      .should('have.text', '좌석 열 개수 미만이어야 합니다.');

    cy.get('@aisleInputs')
      .eq(0)
      .find('#aisleNo')
      .type('{selectAll}{backspace}')
      .type('4');
    cy.get('@aisleInputs')
      .eq(0)
      .find('[data-cy="error"]')
      .should('not.be.visible');
    cy.get('@aisleInputs').eq(1).find('[data-cy="deleteAisleInput"]').click();
    cy.get('[data-cy="error"]').should('not.be.visible');

    cy.get('#totalRow').type('{selectAll}{backspace}').type('4');
    cy.get('@aisleInputs')
      .eq(0)
      .find('[data-cy="error"]')
      .should('have.text', '좌석 행 개수 미만이어야 합니다.');
  });

  it('선택 불가능한 좌석 인풋에 입력된 값이 좌석의 범위를 벗어남', () => {
    cy.get('#totalRow').type('3');
    cy.get('#totalColumn').type('5');
    cy.get('[data-cy="addUnselectableSeatInput"]').click();
    cy.get('[data-cy="addUnselectableSeatInput"]').click();
    cy.contains('선택 불가능한 좌석 지정하기')
      .nextAll('.row')
      .as('unselectableSeatInputs');
    cy.get('@unselectableSeatInputs').should('have.length', 2);

    cy.get('@unselectableSeatInputs').eq(0).find('#row').type('4');
    cy.get('@unselectableSeatInputs').eq(0).find('#column').type('4');
    cy.get('@unselectableSeatInputs')
      .eq(0)
      .find('[data-cy="error"]')
      .should('have.text', '좌석 행 개수 이하여야 합니다.');
    cy.get('@unselectableSeatInputs')
      .eq(1)
      .find('#unselectableSeatType')
      .select('unavailable');
    cy.get('@unselectableSeatInputs').eq(1).find('#row').type('3');
    cy.get('@unselectableSeatInputs').eq(1).find('#column').type('6');
    cy.get('@unselectableSeatInputs')
      .eq(1)
      .find('[data-cy="error"]')
      .should('have.text', '좌석 열 개수 이하여야 합니다.');

    cy.get('@unselectableSeatInputs')
      .eq(0)
      .find('#row')
      .type('{selectAll}{backspace}')
      .type('3');
    cy.get('@unselectableSeatInputs')
      .eq(0)
      .find('[data-cy="error"]')
      .should('not.be.visible');

    cy.get('#totalColumn').type('{selectAll}{backspace}').type('6');
    cy.get('@unselectableSeatInputs')
      .eq(1)
      .find('[data-cy="error"]')
      .should('not.be.visible');
  });

  it('모든 인풋이 작성되지 않음', () => {
    cy.contains(
      '모든 칸에 유효한 값을 입력하면 좌석 배치도가 표시됩니다.'
    ).should('be.visible');
    cy.get('[data-cy="submit"]').should('be.disabled');

    cy.get('#screenNo').type('1');
    cy.get('#totalRow').type('3');
    cy.get('#totalColumn').type('3');
    cy.contains(
      '모든 칸에 유효한 값을 입력하면 좌석 배치도가 표시됩니다.'
    ).should('not.exist');
    cy.contains('노원 영화관에 해당 상영관을 등록합니다.').should('be.visible');
    cy.get('[data-cy="submit"]').should('not.be.disabled');

    cy.get('[data-cy="addAisleInput"]').click();
    cy.contains(
      '모든 칸에 유효한 값을 입력하면 좌석 배치도가 표시됩니다.'
    ).should('be.visible');
    cy.contains('통로 만들기').nextAll('.row').as('aisleInputs');
    cy.get('@aisleInputs').should('have.length', 1);
    cy.get('@aisleInputs').find('#aisleNo').type('2');
    cy.contains('노원 영화관에 해당 상영관을 등록합니다.').should('be.visible');

    cy.get('[data-cy="addUnselectableSeatInput"]').click();
    cy.get('[data-cy="addUnselectableSeatInput"]').click();
    cy.contains(
      '모든 칸에 유효한 값을 입력하면 좌석 배치도가 표시됩니다.'
    ).should('be.visible');
    cy.contains('선택 불가능한 좌석 지정하기')
      .nextAll('.row')
      .as('unselectableSeatInputs');
    cy.get('@unselectableSeatInputs').should('have.length', 2);
    cy.get('@unselectableSeatInputs').eq(1).find('#row').type('2');
    cy.get('@unselectableSeatInputs').eq(1).find('#column').type('2');
    cy.get('@unselectableSeatInputs')
      .eq(0)
      .find('[data-cy="deleteUnselectableSeatInput"]')
      .click();
    cy.contains('노원 영화관에 해당 상영관을 등록합니다.').should('be.visible');
  });
});

describe('상영관 CRUD', () => {
  beforeEach(() => {
    cy.exec('npx prisma db seed');
  });

  it('R', () => {
    cy.visit('http://localhost:3000/admin/screens/1/1');
    cy.contains('상영관 상세').should('be.visible');
    cy.get('[data-cy="error"]').should('not.be.visible');

    cy.get('#screenNo').should('have.value', '1');
    cy.get('#totalRow').should('have.value', '13');
    cy.get('#totalColumn').should('have.value', '46');
    cy.get('[name="aisles.0.typeId"]').should('have.value', '1');
    cy.get('[name="aisles.0.no"]').should('have.value', '2');
    cy.get('[name="aisles.1.typeId"]').should('have.value', '1');
    cy.get('[name="aisles.1.no"]').should('have.value', '3');
    cy.get('[name="aisles.2.typeId"]').should('have.value', '1');
    cy.get('[name="aisles.2.no"]').should('have.value', '7');
    cy.get('[name="aisles.3.typeId"]').should('have.value', '1');
    cy.get('[name="aisles.3.no"]').should('have.value', '10');
    cy.get('[name="aisles.4.typeId"]').should('have.value', '2');
    cy.get('[name="aisles.4.no"]').should('have.value', '40');
    cy.get('[name="aisles.5.typeId"]').should('have.value', '2');
    cy.get('[name="aisles.5.no"]').should('have.value', '43');
    cy.get('[name="unselectableSeats.0.typeId"]').should('have.value', '2');
    cy.get('[name="unselectableSeats.0.row"]').should('have.value', '1');
    cy.get('[name="unselectableSeats.0.column"]').should('have.value', '1');
    cy.get('[name="unselectableSeats.1.typeId"]').should('have.value', '2');
    cy.get('[name="unselectableSeats.1.row"]').should('have.value', '1');
    cy.get('[name="unselectableSeats.1.column"]').should('have.value', '2');
    cy.get('[name="unselectableSeats.2.typeId"]').should('have.value', '1');
    cy.get('[name="unselectableSeats.2.row"]').should('have.value', '5');
    cy.get('[name="unselectableSeats.2.column"]').should('have.value', '5');
    cy.get('[name="unselectableSeats.3.typeId"]').should('have.value', '1');
    cy.get('[name="unselectableSeats.3.row"]').should('have.value', '5');
    cy.get('[name="unselectableSeats.3.column"]').should('have.value', '6');
    cy.get('[name="unselectableSeats.4.typeId"]').should('have.value', '1');
    cy.get('[name="unselectableSeats.4.row"]').should('have.value', '5');
    cy.get('[name="unselectableSeats.4.column"]').should('have.value', '7');
  });

  it('C', () => {
    cy.visit('http://localhost:3000/admin/screens/4/create');
    cy.contains('상영관 등록').should('be.visible');
    cy.get('[data-cy="error"]').should('not.be.visible');

    cy.get('#screenNo').type('1');
    cy.get('#totalRow').type('9');
    cy.get('#totalColumn').type('10');

    cy.get('[data-cy="addAisleInput"]').click();
    cy.get('[data-cy="addAisleInput"]').click();
    cy.get('[data-cy="addAisleInput"]').click();
    cy.get('[data-cy="addAisleInput"]').click();
    cy.get('[data-cy="addAisleInput"]').click();
    cy.get('[name="aisles.0.typeId"]').select('column');
    cy.get('[name="aisles.0.no"]').type('2');
    cy.get('[name="aisles.1.typeId"]').select('row');
    cy.get('[name="aisles.1.no"]').type('8');
    cy.get('[name="aisles.2.typeId"]').select('row');
    cy.get('[name="aisles.2.no"]').type('5');
    cy.get('[name="aisles.3.typeId"]').select('row');
    cy.get('[name="aisles.3.no"]').type('6');
    cy.get('[name="aisles.4.typeId"]').select('row');
    cy.get('[name="aisles.4.no"]').type('6');

    cy.get('[data-cy="addUnselectableSeatInput"]').click();
    cy.get('[data-cy="addUnselectableSeatInput"]').click();
    cy.get('[data-cy="addUnselectableSeatInput"]').click();
    cy.get('[data-cy="addUnselectableSeatInput"]').click();
    cy.get('[data-cy="addUnselectableSeatInput"]').click();
    cy.get('[data-cy="addUnselectableSeatInput"]').click();
    cy.get('[data-cy="addUnselectableSeatInput"]').click();
    cy.get('[name="unselectableSeats.0.typeId"]').select('unavailable');
    cy.get('[name="unselectableSeats.0.row"]').type('5');
    cy.get('[name="unselectableSeats.0.column"]').type('5');
    cy.get('[name="unselectableSeats.1.typeId"]').select('unavailable');
    cy.get('[name="unselectableSeats.1.row"]').type('1');
    cy.get('[name="unselectableSeats.1.column"]').type('1');
    cy.get('[name="unselectableSeats.2.typeId"]').select('nonexistent');
    cy.get('[name="unselectableSeats.2.row"]').type('1');
    cy.get('[name="unselectableSeats.2.column"]').type('1');
    cy.get('[name="unselectableSeats.3.typeId"]').select('nonexistent');
    cy.get('[name="unselectableSeats.3.row"]').type('3');
    cy.get('[name="unselectableSeats.3.column"]').type('3');
    cy.get('[name="unselectableSeats.4.typeId"]').select('nonexistent');
    cy.get('[name="unselectableSeats.4.row"]').type('3');
    cy.get('[name="unselectableSeats.4.column"]').type('2');
    cy.get('[name="unselectableSeats.5.typeId"]').select('unavailable');
    cy.get('[name="unselectableSeats.5.row"]').type('3');
    cy.get('[name="unselectableSeats.5.column"]').type('4');
    cy.get('[name="unselectableSeats.6.typeId"]').select('unavailable');
    cy.get('[name="unselectableSeats.6.row"]').type('1');
    cy.get('[name="unselectableSeats.6.column"]').type('2');

    cy.get('[data-cy="submit"]').click();
    cy.contains('등록이 완료되었습니다.');

    cy.visit('http://localhost:3000/admin/screens/4/1');
    cy.contains('상영관 상세').should('be.visible');
    cy.get('[data-cy="error"]').should('not.be.visible');

    cy.get('#screenNo').should('have.value', '1');
    cy.get('#totalRow').should('have.value', '9');
    cy.get('#totalColumn').should('have.value', '10');
    cy.get('[name="aisles.0.typeId"]').should('have.value', '1');
    cy.get('[name="aisles.0.no"]').should('have.value', '5');
    cy.get('[name="aisles.1.typeId"]').should('have.value', '1');
    cy.get('[name="aisles.1.no"]').should('have.value', '6');
    cy.get('[name="aisles.2.typeId"]').should('have.value', '1');
    cy.get('[name="aisles.2.no"]').should('have.value', '8');
    cy.get('[name="aisles.3.typeId"]').should('have.value', '2');
    cy.get('[name="aisles.3.no"]').should('have.value', '2');
    cy.get('[name="unselectableSeats.0.typeId"]').should('have.value', '1');
    cy.get('[name="unselectableSeats.0.row"]').should('have.value', '1');
    cy.get('[name="unselectableSeats.0.column"]').should('have.value', '1');
    cy.get('[name="unselectableSeats.1.typeId"]').should('have.value', '2');
    cy.get('[name="unselectableSeats.1.row"]').should('have.value', '1');
    cy.get('[name="unselectableSeats.1.column"]').should('have.value', '2');
    cy.get('[name="unselectableSeats.2.typeId"]').should('have.value', '1');
    cy.get('[name="unselectableSeats.2.row"]').should('have.value', '3');
    cy.get('[name="unselectableSeats.2.column"]').should('have.value', '2');
    cy.get('[name="unselectableSeats.3.typeId"]').should('have.value', '1');
    cy.get('[name="unselectableSeats.3.row"]').should('have.value', '3');
    cy.get('[name="unselectableSeats.3.column"]').should('have.value', '3');
    cy.get('[name="unselectableSeats.4.typeId"]').should('have.value', '2');
    cy.get('[name="unselectableSeats.4.row"]').should('have.value', '3');
    cy.get('[name="unselectableSeats.4.column"]').should('have.value', '4');
    cy.get('[name="unselectableSeats.5.typeId"]').should('have.value', '2');
    cy.get('[name="unselectableSeats.5.row"]').should('have.value', '5');
    cy.get('[name="unselectableSeats.5.column"]').should('have.value', '5');
  });

  it('중복된 상영관 번호로 등록', () => {
    cy.visit('http://localhost:3000/admin/screens/1/create');

    cy.get('#screenNo').type('1');
    cy.get('#totalRow').type('1');
    cy.get('#totalColumn').type('1');
    cy.get('[data-cy="submit"]').click();
    cy.get('[data-cy="alert"]').should('include.text', '고유 제약 조건 오류');
  });

  it('U', () => {
    cy.visit('http://localhost:3000/admin/screens/1/1');
    cy.contains('상영관 상세').should('be.visible');
    cy.get('[data-cy="error"]').should('not.be.visible');

    cy.get('#totalRow').type('{selectAll}{backspace}').type('20');
    cy.get('#totalColumn').type('{selectAll}{backspace}').type('20');

    cy.contains('통로 만들기').nextAll('.row').as('aisleInputs');
    cy.get('@aisleInputs').eq(4).find('[data-cy="deleteAisleInput"]').click();
    cy.get('@aisleInputs').eq(4).find('[data-cy="deleteAisleInput"]').click();
    cy.get('[name="aisles.0.typeId"]').select('column');
    cy.get('[name="aisles.2.no"]').type('{selectAll}{backspace}').type('13');

    cy.contains('선택 불가능한 좌석 지정하기')
      .nextAll('.row')
      .as('unselectableSeatInputs');
    cy.get('@unselectableSeatInputs')
      .eq(0)
      .find('[data-cy="deleteUnselectableSeatInput"]')
      .click();
    cy.get('[name="unselectableSeats.0.typeId"]').select('nonexistent');
    cy.get('[name="unselectableSeats.1.typeId"]').select('unavailable');
    cy.get('[name="unselectableSeats.2.column"]')
      .type('{selectAll}{backspace}')
      .type('5');
    cy.get('[name="unselectableSeats.3.column"]')
      .type('{selectAll}{backspace}')
      .type('4');
    cy.get('[data-cy="addUnselectableSeatInput"]').click();
    cy.get('[name="unselectableSeats.4.typeId"]').select('unavailable');
    cy.get('[name="unselectableSeats.4.row"]').type('3');
    cy.get('[name="unselectableSeats.4.column"]').type('3');

    cy.get('[type="submit"]').click();
    cy.contains('수정이 완료되었습니다.');

    cy.visit('http://localhost:3000/admin/screens/1/1');
    cy.contains('상영관 상세').should('be.visible');
    cy.get('[data-cy="error"]').should('not.be.visible');

    cy.get('#screenNo').should('have.value', '1');
    cy.get('#totalRow').should('have.value', '20');
    cy.get('#totalColumn').should('have.value', '20');
    cy.get('[name="aisles.0.typeId"]').should('have.value', '1');
    cy.get('[name="aisles.0.no"]').should('have.value', '3');
    cy.get('[name="aisles.1.typeId"]').should('have.value', '1');
    cy.get('[name="aisles.1.no"]').should('have.value', '10');
    cy.get('[name="aisles.2.typeId"]').should('have.value', '1');
    cy.get('[name="aisles.2.no"]').should('have.value', '13');
    cy.get('[name="aisles.3.typeId"]').should('have.value', '2');
    cy.get('[name="aisles.3.no"]').should('have.value', '2');
    cy.get('[name="unselectableSeats.0.typeId"]').should('have.value', '1');
    cy.get('[name="unselectableSeats.0.row"]').should('have.value', '1');
    cy.get('[name="unselectableSeats.0.column"]').should('have.value', '2');
    cy.get('[name="unselectableSeats.1.typeId"]').should('have.value', '2');
    cy.get('[name="unselectableSeats.1.row"]').should('have.value', '3');
    cy.get('[name="unselectableSeats.1.column"]').should('have.value', '3');
    cy.get('[name="unselectableSeats.2.typeId"]').should('have.value', '1');
    cy.get('[name="unselectableSeats.2.row"]').should('have.value', '5');
    cy.get('[name="unselectableSeats.2.column"]').should('have.value', '4');
    cy.get('[name="unselectableSeats.3.typeId"]').should('have.value', '1');
    cy.get('[name="unselectableSeats.3.row"]').should('have.value', '5');
    cy.get('[name="unselectableSeats.3.column"]').should('have.value', '5');
  });

  it('D', () => {
    cy.visit('http://localhost:3000/admin/screens');
    cy.contains('영화관 및 상영관 목록');

    cy.contains('월드타워').click();
    cy.contains('10관');

    cy.visit('http://localhost:3000/admin/screens/1/10');
    cy.get('[data-cy="delete"]').click();
    cy.contains('삭제 확인');
    cy.get('[data-cy="confirmButtons"]').contains('삭제').click();
    cy.contains('삭제가 완료되었습니다.');

    cy.visit('http://localhost:3000/admin/screens');
    cy.contains('월드타워').click();
    cy.contains('10관').should('not.exist');
  });
});

describe('상영관 CUD에 의한 총 좌석 수 갱신', () => {
  beforeEach(() => {
    cy.exec('npx prisma db seed');
  });

  it('초깃값', () => {
    cy.visit('http://localhost:3000/theaters/1');
    cy.get('[data-cy="title"]').should('have.text', '월드타워');

    cy.get('[data-cy="screenCount"]').should('have.text', '15');
    cy.get('[data-cy="seatCount"]').should('have.text', '7,933');
  });

  it('C', () => {
    cy.request('POST', 'http://localhost:3000/api/theaters/1/screens', {
      no: 16,
      total_row: 5,
      total_column: 6,
      aisles: [{ aisle_type_id: 1, no: 3 }],
      unselectable_seats: [
        { unselectable_seat_type_id: 1, row: 2, column: 2 },
        { unselectable_seat_type_id: 1, row: 2, column: 3 },
        { unselectable_seat_type_id: 2, row: 3, column: 3 },
      ],
    } as ScreenPostRequestData);

    cy.visit('http://localhost:3000/theaters/1');
    cy.get('[data-cy="title"]').should('have.text', '월드타워');

    cy.get('[data-cy="screenCount"]').should('have.text', '16');
    cy.get('[data-cy="seatCount"]').should('have.text', '7,961');
  });

  it('U', () => {
    cy.request('PUT', 'http://localhost:3000/api/theaters/1/screens/15', {
      no: 15,
      total_row: 7,
      total_column: 7,
      aisles: [
        { aisle_type_id: 1, no: 3 },
        { aisle_type_id: 1, no: 4 },
        { aisle_type_id: 2, no: 3 },
      ],
      unselectable_seats: [
        { unselectable_seat_type_id: 1, row: 1, column: 1 },
        { unselectable_seat_type_id: 1, row: 1, column: 2 },
        { unselectable_seat_type_id: 1, row: 1, column: 3 },
        { unselectable_seat_type_id: 1, row: 1, column: 4 },
        { unselectable_seat_type_id: 2, row: 2, column: 1 },
        { unselectable_seat_type_id: 2, row: 2, column: 2 },
      ],
    } as ScreenPutRequestData);

    cy.visit('http://localhost:3000/theaters/1');
    cy.get('[data-cy="title"]').should('have.text', '월드타워');

    cy.get('[data-cy="screenCount"]').should('have.text', '15');
    cy.get('[data-cy="seatCount"]').should('have.text', '7,380');
  });

  it('D', () => {
    cy.request('DELETE', 'http://localhost:3000/api/theaters/1/screens/1');

    cy.visit('http://localhost:3000/theaters/1');
    cy.get('[data-cy="title"]').should('have.text', '월드타워');

    cy.get('[data-cy="screenCount"]').should('have.text', '14');
    cy.get('[data-cy="seatCount"]').should('have.text', '7,338');
  });
});

export {};

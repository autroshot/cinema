# 시네마

[롯데시네마](https://www.lottecinema.co.kr)를 참고하여 React로 영화 예매 사이트를 일부 구현했습니다.

## 구현 화면

배포된 [웹사이트](cinema-dusky.vercel.app)에서 직접 확인할 수 있습니다. 관리자 서비스 이용을 위한 인증은 다음을 사용할 수 있습니다.

- 이메일 - `admin`
- 비밀번호 - `1234`

또는 다음의 이미지로도 확인할 수 있습니다.

<details>
  <summary>이미지 보기</summary>

  ### 홈

  ![index](https://user-images.githubusercontent.com/95019875/233766410-def5345e-59d4-465d-90d6-002b1113c6df.png)

  ### 관리자 모드의 상영관 상세

  ![admin-screen-detail](https://user-images.githubusercontent.com/95019875/233766485-657faf59-d725-40be-b400-da00dc387b74.png)

</details>

## 기술 스택

### 언어

- JavaScript
- [TypeScript](https://www.typescriptlang.org/)

### 프런트엔드

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [React Bootstrap](https://react-bootstrap.github.io/) - React로 재구성된 Bootstrap

### DB 및 ORM

- [PlanetScale](https://planetscale.com/) - 서버리스 MySQL 플랫폼
- [Prisma](https://www.prisma.io/) - ORM

### 데이터 가져오기

- [Axios](https://axios-http.com/)
- [SWR](https://swr.vercel.app/)

### 폼 및 유효성 검사

- [React Hook Form](https://react-hook-form.com/) - 폼 관리 및 유효성 검사
- [Yup](https://github.com/jquense/yup) - 유효성 검사를 위한 스키마 빌더

### 인증

- [NextAuth.js](https://next-auth.js.org/)

### 테스트 도구

- [Cypress](https://docs.cypress.io/)

### 그 외

- [Swiper](https://swiperjs.com/) - 터치 슬라이더(캐러셀)
- [Google Maps Embed API](https://developers.google.com/maps/documentation/embed/get-started?hl=ko)
- [Google Fonts](https://fonts.google.com/)

## 구현 페이지

- 홈
- 영화관 상세
- 스페셜관 홈 및 상세
- 관리자 모드의 영화관 목록 및 폼
- 관리자 모드의 상영관 목록 및 폼

## 구현 기능

### Next.js에서 제공하는 렌더링 방식

- SG(Static Generation) - 스페셜관 상세 페이지 등
- SSG(Static Site Generation) - 관리자 모드의 상영관 폼의 선택 불가능한 좌석 종류 등
- ISR(Incremental Static Regeneration) - 영화관 및 상영관 변경에 의한 영화관 상세 페이지의 갱신 등
- CSR(Client Side Rendering) - 네비바의 영화관 목록, 관리자 모드의 상영관 상세 페이지의 폼 기본값 등

### DB

- 영화관과 상영관 DB 및 CRUD 구현
- 서버리스 MySQL 플랫폼 [PlanetScale](https://planetscale.com/)과 ORM [Prisma](https://www.prisma.io/) 사용
- [ERD 링크](https://www.erdcloud.com/d/NZpy2yTbB2EDSXqG7)

### 그 외

- 캐러셀 - 홈페이지의 트레일러와 포스터
- 유튜브 연동 - 홈페이지의 영화 트레일러
- 구글 드라이브의 동영상 연동 - 스페셜관 상세 페이지의 배경 영상
- 구글 맵 연동 - 영화관 상세 페이지의 지도 보기
- 구글 폰트 및 아이콘
- 인증 - 모든 관리자 페이지
- 동적인 폼의 입력 값에 대한 유효성 검사 - 관리자 모드의 상영관 폼
- 동적인 좌석 배치도 - 관리자 모드의 상영관 폼

## 고민

### 커스텀 페이지 확장자

[Next.js](https://nextjs.org/)에서 [페이지](https://nextjs.org/docs/basic-features/pages)는 `pages` 디렉터리 내부의 `.js`, `.jsx`, `.ts`, `.tsx` 파일에서 내보낸 리액트 컴포넌트입니다. 기본 설정에서는 `pages` 디렉터리 내부에서 `types.ts` 같은 파일을 사용할 수 없다는 한계가 있습니다. 이때 [커스텀 페이지 확장자](https://nextjs.org/docs/api-reference/next.config.js/custom-page-extensions)를 사용하면 페이지 확장자를 설정할 수 있습니다.

페이지 확장자를 다음과 같이 설정하였습니다.

```js
module.exports = {
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
}
```

이제 기존 페이지에 추가적인 확장자를 붙여야 합니다. 예를 들어 `MyPage.tsx`를 `MyPage.page.tsx`로 변경해야 합니다.

하지만 이제 `pages` 디렉터리 내부에 `types.ts` 같은 파일이 위치할 수 있게 되었습니다.

### Yup 적용

[Yup](https://github.com/jquense/yup)은 유효성 검사를 위한 스키마 작성기입니다.

상영관의 좌석 배치도를 만드는 폼의 입력에 유효성 검사를 적용했습니다. 좌석 배치도에 적용되는 통로와 선택 불가능한 좌석의 입력은 추가되거나 삭제될 수 있어서 동적입니다.

유효성 검사에서는 [React Hook Form](https://react-hook-form.com/)를 사용하였는데, 이 라이브러리에서는 동적인 입력에 대한 유효성 검사를 지원하지 않았습니다. 하지만 Yup을 함께 사용하면 이 한계를 극복할 수 있었습니다.

또한 Yup을 사용함으로서 스키마라는 관심사를 분리한다는 이점을 얻을 수 있습니다.

배포된 웹사이트에서 [관련 페이지](https://cinema-dusky.vercel.app/admin/screens/1/1)를 확인하세요. (인증은 `admin`/`1234`를 사용)

## 한계 및 개선 사항

- 혼자서 하기에는 너무 큰 주제를 잡아서 처음에 구상했던 대부분의 기능(회원, 예매, 평점, 영화 등) 미구현
- Git 브랜치 미활용
- 불안정한 E2E 테스팅 - 무작위적인 테스트 실패


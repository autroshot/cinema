import Layout from 'components/special-screen/layout';
import Image from 'next/image';
import logo from 'public/logos/special-screen/super-plex-g-white.png';
import image1 from 'public/images/special-screen/super-plex-g-detail-1.jpg';
import image2 from 'public/images/special-screen/super-plex-g-detail-2.jpg';
import image3 from 'public/images/special-screen/super-plex-g-detail-3.jpg';
import styles from './common.module.css';

export default function SuperPlexG() {
  const THEATER_LINKS_DUMMY = [
    { name: '월드타워', href: '#' },
    { name: '건대입구', href: '#' },
    { name: '수원', href: '#' },
    { name: '노원', href: '#' },
    { name: '월드타워', href: '#' },
    { name: '건대입구', href: '#' },
    { name: '수원', href: '#' },
    { name: '노원', href: '#' },
  ];

  return (
    <Layout
      src="https://drive.google.com/uc?export=download&id=1aPuTEWEA6-wnLMGhpeTaKQvitR95lXQo"
      poster="/images/special-screen/super-plex-g-video-poster.jpg"
      logo={logo}
      alt="수퍼플렉스G"
      text="기네스북이 인정한 세계 최대 스케일"
      theaterLinks={THEATER_LINKS_DUMMY}
    >
      <article className={styles.articleLeft}>
        <h3 className={styles.textGray}>
          <b>
            The Largest <div className={styles.textLarge}>Screen</div>
          </b>
        </h3>
        <h3 className="mt-3">
          &apos;14 기네스 월드 레코드
          <br />
          세계 최대 스크린
        </h3>
        <p className="my-3">
          34M X 13.8M 초대형 스크린은 세계 어디에서도 느낄 수 없는 압도적인
          스케일로
          <br />
          몰입의 정점을 완성합니다.
        </p>
        <Image src={image1} alt="세계 최대 스크린" />
      </article>
      <article className={styles.articleRight}>
        <h3 className={styles.textGray}>
          <b>
            <div className={styles.textLarge}>Laser</div>
          </b>
        </h3>
        <h3 className="mt-3">듀얼 6P 레이저 영사기</h3>
        <p className="my-3">
          국내 최초로 도입된 듀얼 6P 레이저 영사기는
          <br />
          부드럽고 선명한 화질과 기존 영사기의 1.6배 이상의 밝기를 제공합니다.
        </p>
        <Image src={image2} alt="듀얼 6P 레이저 영사기" />
      </article>
      <article className={styles.articleLeft}>
        <div className="float-start">
          <h3 className={styles.textGray}>
            <b>
              <div className={styles.textLarge}>Dolby</div>
            </b>
          </h3>
          <h3 className="mt-3">
            돌비 애트모스 &amp;
            <br />
            165 어레이 스피커
          </h3>
          <p className="my-3">
            전 좌석 360도 입체 음향을 전하는 돌비 애트모스
            <br />
            165개에 달하는 국내 최대 스피커 시스템은
            <br />
            웅장하고 리얼한 입체 사운드를 구현합니다.
          </p>
        </div>
        <div className="float-end">
          <Image src={image3} alt="돌비 애트모스 스피커" />
        </div>
        <div className="clearfix" />
      </article>
    </Layout>
  );
}

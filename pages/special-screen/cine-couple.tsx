import Layout from 'components/special-screen/layout';
import Image from 'next/image';
import logo from 'public/logos/special-screen/cine-couple-white.png';
import image1 from 'public/images/special-screen/cine-couple-detail-1.jpg';
import image2 from 'public/images/special-screen/cine-couple-detail-2.jpg';
import styles from './common.module.css';

export default function CineCouple() {
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
      src="https://drive.google.com/uc?export=download&id=1yI5OBXxxQqpIIF4PaYhhUkvH6Zqmr6hE"
      poster="/images/special-screen/cine-couple-video-poster.jpg"
      logo={logo}
      alt="씨네커플"
      text="연인을 위한 두근두근 커플석"
      theaterLinks={THEATER_LINKS_DUMMY}
    >
      <article className={styles.articleLeft}>
        <div className="float-start">
          <h3 className={styles.textGray}>
            <b>
              Private<div className={styles.textLarge}>Space</div>
            </b>
          </h3>
          <h3 className="mt-3">데이트를 위한 최고의 선택</h3>
          <p className="my-3">
            넓은 독립형 좌석으로 로맨틱한 영화관람은 물론
            <br />
            둘만의 프라이버시를 지켜드립니다.
          </p>
        </div>
        <div className="float-end">
          <Image src={image1} alt="독립형 좌석" />
        </div>
        <div className="clearfix" />
      </article>
      <article className={styles.articleLeft}>
        <h3 className={styles.textGray}>
          <b>
            Romantic <div className={styles.textLarge}>Moment</div>
          </b>
        </h3>
        <h3 className="mt-3">눈치보지 않고 둘만의 오붓한 시간</h3>
        <p className="my-3">
          영화를 보는 내내 계속되는 둘만의 오붓한 시간, 씨네커플에서 경험하세요.
        </p>
        <Image src={image2} alt="둘만의 오붓한 시간" />
      </article>
    </Layout>
  );
}

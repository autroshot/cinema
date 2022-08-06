import { Col, Container, Row } from 'react-bootstrap';
import TheaterLinks from '../../components/special-screen/theaterLinks';
import TitleWithVideo from '../../components/special-screen/titleWithVideo';
import Image from 'next/image';
import logo from '../../public/logos/special-screen/colorium-white.png';
import image1 from '../../public/images/special-screen/colorium-detail-1.jpg';
import image2 from '../../public/images/special-screen/colorium-detail-2.jpg';
import image3 from '../../public/images/special-screen/colorium-detail-3.jpg';
import image4 from '../../public/images/special-screen/colorium-detail-4.jpg';
import image5 from '../../public/images/special-screen/colorium-detail-5.png';
import image6 from '../../public/images/special-screen/colorium-detail-6.jpg';
import styles from './super-plex-g.module.css';

export default function Colorium() {
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
    <>
      <Container fluid className="position-relative p-0 bg-black">
        <TitleWithVideo
          src="https://drive.google.com/uc?export=download&id=1ZdM8lwLuXvBsazxYfnGRC3hs5LqdV2cr"
          poster="/images/special-screen/colorium-video-poster.jpg"
          logo={logo}
          alt="컬러리움"
          text="세상의 모든 색으로 영화를 보다"
        />
      </Container>
      <Container className="my-5">
        <Row className="mb-2">
          <Col>
            <h5>
              <b>컬러리움 상영시간표</b>
            </h5>
          </Col>
        </Row>
        <section>
          <TheaterLinks theaterLinks={THEATER_LINKS_DUMMY} />
        </section>
        <section>
          <article className={styles.articleLeft}>
            <h3 className={styles.textGray}>
              <b>
                The <div className={styles.textLarge}>Largest</div>
              </b>
            </h3>
            <h3 className="mt-3">국내 최초 14M 대형 LED 시네마</h3>
            <p className="my-3">
              현존하는 세계 최대 크기의 LED 스크린을 만나보세요.
            </p>
            <Image src={image1} alt="대형 LED 시네마" />
          </article>
          <article className={styles.articleRight}>
            <div>
              <Image src={image2} alt="정교하고 선명한 색감" />
            </div>
            <div className="mt-3">
              <div className="float-end">
                <h3 className={styles.textGray}>
                  <b>
                    <div className={styles.textLarge}>Colorful</div>
                  </b>
                </h3>
                <h3 className="mt-3">세상의 모든 색을 만나다</h3>
                <p className="my-3">
                  정교하고 선명한 색감과 리얼블랙까지
                  <br />
                  세상의 모든 색을 온전히 만날 수 있는 공간입니다.
                </p>
              </div>
              <div className="float-start">
                <Image src={image3} alt="무한대 명암비" />
              </div>
            </div>
            <div className="clearfix" />
          </article>
          <article className={styles.articleLeft}>
            <div className="float-start">
              <h3 className={styles.textGray}>
                <b>
                  <div className={styles.textLarge}>POWERFUL</div>SOUND
                </b>
              </h3>
              <h3 className="mt-3">하만 JBL 오디오 시스템</h3>
              <p className="my-3">
                하만 최정상 기술로 더욱 파워풀해진 스피커와
                <br />
                정교해진 설계로 어느 자리에서나 최상의 음질을 제공합니다.
              </p>
            </div>
            <div className="float-end">
              <Image src={image4} alt="하만 JBL 오디오 시스템" />
            </div>
            <div className="clearfix" />
          </article>
          <article className={styles.articleRight}>
            <div className="float-start">
              <Image src={image5} alt="리클라이너 좌석" />
            </div>
            <div className="float-end">
              <h3 className={styles.textGray}>
                <b>
                  <div className={styles.textLarge}>Recliner Chair</div>
                </b>
              </h3>
              <p className="my-3">
                뒷자석 리클라이너, 앞좌석 와이드 일반석으로
                <br />
                영화관람 몰입감을 위한 편안함을 제공합니다.
              </p>
            </div>
            <div className="clearfix" />
          </article>
          <article className={styles.articleLeft}>
            <h3 className={styles.textGray}>
              <b>
                <div className={styles.textLarge}>Laser Performance</div>
              </b>
            </h3>
            <p className="my-3">
              컬러리움 상영관에서만 느낄 수 있는 레이저 퍼포먼스를 만나보세요.
            </p>
            <Image src={image6} alt="레이저 퍼포먼스" />
          </article>
        </section>
      </Container>
    </>
  );
}

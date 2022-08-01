import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Card } from 'react-bootstrap';
import Image from 'next/image';
import movie1 from '../../public/images/dummy/movies/01.jpg';

export default function Carousel() {
  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={10}
      slidesPerView={5}
      navigation
    >
      <SwiperSlide>
        <Card>
          <Image src={movie1} alt={'한산'} />
          <Card.Body>
            <Card.Title>한산: 용의 출현</Card.Title>
            <Card.Text>예매율 44.4% | 별 9.4 | 하트</Card.Text>
          </Card.Body>
        </Card>
      </SwiperSlide>
      <SwiperSlide>
        <Card>
          <Image src={movie1} alt={'한산'} />
          <Card.Body>
            <Card.Title>한산: 용의 출현</Card.Title>
            <Card.Text>예매율 44.4% | 별 9.4 | 하트</Card.Text>
          </Card.Body>
        </Card>
      </SwiperSlide>
      <SwiperSlide>
        <Card>
          <Image src={movie1} alt={'한산'} />
          <Card.Body>
            <Card.Title>한산: 용의 출현</Card.Title>
            <Card.Text>예매율 44.4% | 별 9.4 | 하트</Card.Text>
          </Card.Body>
        </Card>
      </SwiperSlide>
      <SwiperSlide>
        <Card>
          <Image src={movie1} alt={'한산'} />
          <Card.Body>
            <Card.Title>한산: 용의 출현</Card.Title>
            <Card.Text>예매율 44.4% | 별 9.4 | 하트</Card.Text>
          </Card.Body>
        </Card>
      </SwiperSlide>
      <SwiperSlide>
        <Card>
          <Image src={movie1} alt={'한산'} />
          <Card.Body>
            <Card.Title>한산: 용의 출현</Card.Title>
            <Card.Text>예매율 44.4% | 별 9.4 | 하트</Card.Text>
          </Card.Body>
        </Card>
      </SwiperSlide>
      <SwiperSlide>
        <Card>
          <Image src={movie1} alt={'한산'} />
          <Card.Body>
            <Card.Title>한산: 용의 출현</Card.Title>
            <Card.Text>예매율 44.4% | 별 9.4 | 하트</Card.Text>
          </Card.Body>
        </Card>
      </SwiperSlide>
      <SwiperSlide>
        <Card>
          <Image src={movie1} alt={'한산'} />
          <Card.Body>
            <Card.Title>한산: 용의 출현</Card.Title>
            <Card.Text>예매율 44.4% | 별 9.4 | 하트</Card.Text>
          </Card.Body>
        </Card>
      </SwiperSlide>
      <SwiperSlide>
        <Card>
          <Image src={movie1} alt={'한산'} />
          <Card.Body>
            <Card.Title>한산: 용의 출현</Card.Title>
            <Card.Text>예매율 44.4% | 별 9.4 | 하트</Card.Text>
          </Card.Body>
        </Card>
      </SwiperSlide>
      <SwiperSlide>
        <Card>
          <Image src={movie1} alt={'한산'} />
          <Card.Body>
            <Card.Title>한산: 용의 출현</Card.Title>
            <Card.Text>예매율 44.4% | 별 9.4 | 하트</Card.Text>
          </Card.Body>
        </Card>
      </SwiperSlide>
      <SwiperSlide>
        <Card>
          <Image src={movie1} alt={'한산'} />
          <Card.Body>
            <Card.Title>한산: 용의 출현</Card.Title>
            <Card.Text>예매율 44.4% | 별 9.4 | 하트</Card.Text>
          </Card.Body>
        </Card>
      </SwiperSlide>
    </Swiper>
  );
}

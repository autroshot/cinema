import Layout from '../../components/special-screen/layout';
import logo from '../../public/logos/special-screen/cine-couple-white.png';

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
      hello
    </Layout>
  );
}

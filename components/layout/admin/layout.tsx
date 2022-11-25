import { ScriptProps } from 'next/script';
import { Container } from 'react-bootstrap';
import Footer from '../common/footer';
import Navbar from './navbar';

export default function Layout({ children }: ScriptProps) {
  return (
    <Container>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </Container>
  );
}

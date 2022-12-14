import { ScriptProps } from 'next/script';
import Footer from '../common/footer';
import Navbar from './navbar';

export default function Layout({ children }: ScriptProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

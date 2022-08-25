import { ScriptProps } from 'next/script';
import Footer from './footer';
import Navbar from './navbar';

export default function GeneralLayout({ children }: ScriptProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

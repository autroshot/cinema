import { ScriptProps } from 'next/script';
import Navbar from './navbar';

export default function Layout({ children }: ScriptProps) {
  return (
    <>
      <Navbar></Navbar>
      <main>layout{children}</main>
    </>
  );
}

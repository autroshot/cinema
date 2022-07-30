import { ScriptProps } from 'next/script';

export default function Layout({ children }: ScriptProps) {
  return <main>{children}</main>;
}

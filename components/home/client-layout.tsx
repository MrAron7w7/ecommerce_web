'use client';

import { usePathname } from 'next/navigation';
import HeaderLayout from './header-layout';
import FooterLayout from './footer-layout';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  const isDashboardRoute = pathname.startsWith('/dashboard');

  return (
    <>
      {!isDashboardRoute && <HeaderLayout />}
      {children}
      {!isDashboardRoute && <FooterLayout />}
    </>
  );
}
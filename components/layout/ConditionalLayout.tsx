'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isAdminRoute, setIsAdminRoute] = useState(false);

  useEffect(() => {
    setIsAdminRoute(pathname?.startsWith('/dashboard') ?? false);
  }, [pathname]);

  return (
    <>
      {!isAdminRoute && <Header />}
      <main className="min-h-screen">{children}</main>
      {!isAdminRoute && <Footer />}
    </>
  );
}


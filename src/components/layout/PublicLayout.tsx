import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileBookingBar } from './MobileBookingBar';
import { ScrollToTop } from './ScrollToTop';

export function PublicLayout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="pb-20 md:pb-0"><Outlet /></main>
      <Footer />
      <MobileBookingBar />
    </>
  );
}

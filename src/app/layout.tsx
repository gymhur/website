import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import PostHogProvider from '@/components/PostHogProvider';

export const metadata: Metadata = {
  title: 'Gymhur — Custom Sportswear Manufacturer',
  description: 'Premier custom sportswear and activewear manufacturer. Low MOQs. OEM/ODM solutions. Based in Sialkot, Pakistan.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PostHogProvider>
          <Navbar />
          {children}
          <WhatsAppButton phoneNumber="923001496487" />
          <Footer />
        </PostHogProvider>
      </body>
    </html>
  );
}

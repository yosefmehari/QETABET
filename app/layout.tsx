import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { LanguageProvider } from '@/lib/i18n';

const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'QetaBet | Verified Addis Ababa Rentals (0% Broker Fee) | ቀጣቤት',
  description:
    'Find verified apartments, studios, and rooms in Addis Ababa (Bole, CMC, Kazanchis, Sarbet). Direct homeowner listings with verified water reserve tanks and backup generators. የተረጋገጡ የአዲስ አበባ የቤት ኪራዮች ያለ ደላላ።',
  keywords: [
    'Addis Ababa rentals',
    'Ethiopia house rent',
    'የአዲስ አበባ የቤት ኪራይ',
    'ቀጣቤት',
    'ያለ ደላላ ቤት ኪራይ',
    'Bole apartments',
    'Kazanchis studio',
    'CMC house for rent',
    'No delala house rent Addis',
    'Telebirr rental payment',
    'QetaBet',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="am" className={fontSans.variable}>
      <body className="min-h-screen bg-[#faf9f6] text-stone-900 antialiased flex flex-col font-sans selection:bg-emerald-600 selection:text-white">
        <LanguageProvider>
          {/* Subtle Ethiopian Tricolor Accent Hairline */}
          <div className="ethiopian-bar sticky top-0 z-50" />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}

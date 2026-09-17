import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'QetaBet | Verified Addis Ababa Rentals (0% Broker Fee)',
  description:
    'Find verified apartments, studios, and rooms in Addis Ababa (Bole, CMC, Kazanchis, Sarbet). Direct homeowner listings with verified water reserve tanks and backup generators.',
  keywords: [
    'Addis Ababa rentals',
    'Ethiopia house rent',
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
    <html lang="en">
      <body className="min-h-screen bg-stone-50 text-stone-900 antialiased flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

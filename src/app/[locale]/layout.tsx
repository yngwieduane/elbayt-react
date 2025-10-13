import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import Navigation from './_components/Navigation';
import { Metadata } from 'next';
import Footer from './_components/Footer';
import "../globals.css";
import { Poppins } from "next/font/google";
import { GoogleTagManager } from '@next/third-parties/google';
import PopularCommunity from './_components/PopularCommunity';
 
export const metadata: Metadata = {
    title: "Best Real Estate Website in Egypt | elbayt.com",
    description: "Find your next residential or commercial property with Egypt’s largest real estate website elbayt.com . Our complete database of real estate listings will make finding your next place easy! | elbayt.com",
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
};
const poppins = Poppins({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-poppins',
    display: 'swap'
})

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  // Ensure that the incoming `locale` is valid
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
 
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <GoogleTagManager gtmId="GTM-WPBGXQL" />
      <body className={poppins.className}>
        <NextIntlClientProvider>
          <Navigation/>
          {children}
          <PopularCommunity className="overflow-x-auto mb-5"/>
          <Footer/>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
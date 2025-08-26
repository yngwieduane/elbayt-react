import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import Navigation from './_components/Navigation';
import { Metadata } from 'next';
import Footer from './_components/Footer';
import "../globals.css";
 
export const metadata: Metadata = {
  title: "Best Real Estate Website in Egypt | elbayt.com",
  description: "Find your next residential or commercial property with Egypt’s largest real estate website elbayt.com . Our complete database of real estate listings will make finding your next place easy! | elbayt.com",
};


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
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <Navigation/>
          {children}
          <Footer/>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
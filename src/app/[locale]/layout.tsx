import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "../globals.css";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import { ScrollToTop } from "@/components/scroll-to-top";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

import {getTranslations} from 'next-intl/server';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Metadata'});
 
  return {
    metadataBase: new URL('https://dream-tech.uz'),
    title: t('title'),
    description: t('description'),
    keywords: [
      "IT agency",
      "web development",
      "mobile apps",
      "UI/UX design",
      "digital marketing",
      "Dream Tech",
      "DreamTech",
      "dream-tech",
      "Telegram bots",
      "web sayt",
      "veb sayt",
      "veb saytlar",
      "telegram botlar",
      "O'zbekiston IT kompaniya",
      "software development Uzbekistan"
    ],
    authors: [{ name: "Dream Tech" }],
    icons: {
      icon: [
        { url: '/icon.jpg', sizes: '32x32', type: 'image/jpeg' },
        { url: '/icon.jpg', sizes: '192x192', type: 'image/jpeg' },
      ],
      apple: [
        { url: '/icon.jpg', sizes: '180x180', type: 'image/jpeg' },
      ],
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://dream-tech.uz/${locale}`,
      siteName: "Dream Tech",
      images: [
        {
          url: '/logo-dark.jpg',
          width: 1200,
          height: 630,
          alt: 'Dream Tech Logo',
        },
      ],
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: "summary_large_image",
      title: t('title'),
      description: t('description'),
      images: ['/logo-dark.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `https://dream-tech.uz/${locale}`,
      languages: {
        'uz': 'https://dream-tech.uz/uz',
        'ru': 'https://dream-tech.uz/ru',
        'en': 'https://dream-tech.uz/en',
      },
    },
    manifest: '/manifest.json',
    verification: {
      google: "HktqQ5AGAKjkVZCy58jprDQySaGqLu2mU0n14RTSEBo",
    },
  };
}

import GoogleAnalytics from "@/components/analytics/google-analytics";

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen`}
      >
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''} />
        <NextIntlClientProvider messages={messages}>
          <ScrollToTop />
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          
          {/* JSON-LD Schema for SEO */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Dream Tech",
                "url": "https://dream-tech.uz",
                "logo": "https://dream-tech.uz/logo-dark.jpg",
                "contactPoint": {
                   "@type": "ContactPoint",
                   "telephone": "+998 50 772 31 08",
                   "contactType": "customer service",
                   "areaServed": "UZ",
                   "availableLanguage": ["Uzbek", "Russian", "English"]
                },
                "sameAs": [
                  "https://t.me/dream_tech_manager",
                  "https://instagram.com/dreamtech"
                ]
              })
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

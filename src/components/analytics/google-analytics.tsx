'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { contactEventFor, track } from '@/lib/analytics';

// One delegated listener tracks every Telegram / phone / email link on the page,
// tagged with the section it was clicked in (hero, pricing, contact, footer...).
function ContactClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!link) return;
      const href = link.getAttribute('href') || '';
      const event = contactEventFor(href);
      if (!event) return;

      const section =
        link.closest('section[id]')?.id ||
        (link.closest('header') ? 'header' : link.closest('footer') ? 'footer' : 'other');

      // Portfolio bot cards link to clients' bots, not to us: not a lead
      track(section === 'portfolio' ? 'portfolio_click' : event, {
        section,
        link_text: link.textContent?.trim().slice(0, 80) || undefined,
        link_url: href.split('?')[0],
      });
    };

    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
}

export default function GoogleAnalytics({ gaId }: { gaId: string }) {
  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());

          gtag('config', '${gaId}');
        `}
      </Script>
      <ContactClickTracker />
    </>
  );
}

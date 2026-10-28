// Canonical site origin. Non-www and /uz both redirect here, so all SEO URLs must use it.
export const SITE_URL = "https://www.dream-tech.uz";

export const INSTAGRAM_URL = "https://www.instagram.com/dreamtech_agency/";

// Default locale (uz) is served without a prefix (localePrefix: "as-needed")
export function localeUrl(locale: string) {
  return locale === "uz" ? `${SITE_URL}/` : `${SITE_URL}/${locale}`;
}

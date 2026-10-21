export const SITE_NAME = 'LOKA JAPANESE FOOD BEVERAGE';
export const SITE_URL = 'https://lokajapanesefoodsbeverage.com';

/** External destinations used by the original menu and calls to action. */
export const LINKS = {
  news: 'https://seats-inc.com/category/loka-japanese-foods-beverage/',
  career: 'https://seats-inc.com/option-career/',
  seats: 'https://seats-inc.com/',
  facebook: 'https://www.facebook.com/lokajapanesefoodsbeverage',
  email: 'loka-general@seats-inc.com',
};

/** English paths that have a rebuilt Japanese twin under /ja/. */
export const JA_PAGES = ['/', '/about-us-loka/', '/products/', '/japanese-food-supplier-cambodia/'];

/** Internal link for the page language: the /ja/ twin when one exists, otherwise the English page. */
export const localHref = (lang: 'en' | 'ja', path: string) => (lang === 'ja' && JA_PAGES.includes(path) ? `/ja${path}` : path);

export const pageLang = (path: string) => (path.startsWith('/ja/') ? 'ja' : 'en');

/** The other language of the current page, or null when the page has no Japanese twin yet. */
export const altLang = (path: string) => {
  if (path.startsWith('/ja/')) return { lang: 'en', href: path.slice(3) } as const;
  return JA_PAGES.includes(path) ? ({ lang: 'ja', href: `/ja${path}` } as const) : null;
};

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export const NAV: NavItem[] = [
  { label: 'About LOKA', href: '/about-us-loka/' },
  { label: 'Products', href: '/products/' },
  { label: 'NEWS', href: LINKS.news, external: true },
  { label: 'Career', href: LINKS.career, external: true },
  { label: 'Contact', href: '/contact/' },
];

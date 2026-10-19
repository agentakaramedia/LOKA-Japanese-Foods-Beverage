export const SITE_NAME = 'LOKA JAPANESE FOOD BEVERAGE';
export const SITE_URL = 'https://lokajapanesefoodsbeverage.com';

/** External destinations used by the original menu and calls to action. */
export const LINKS = {
  news: 'https://seats-inc.com/category/loka-japanese-foods-beverage/',
  career: 'https://seats-inc.com/option-career/',
  seats: 'https://seats-inc.com/',
  facebook: 'https://www.facebook.com/lokajapanesefoodsbeverage',
  email: 'loka-general@seats-inc.com',
  // Japanese version (TranslatePress) of the original site; not part of this rebuild.
  japanese: 'https://lokajapanesefoodsbeverage.com/ja/',
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

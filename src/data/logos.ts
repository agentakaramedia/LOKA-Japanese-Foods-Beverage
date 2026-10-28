/**
 * Client and supplier logos, shared by the About page grid, the Products page grid and the
 * home page carousel.
 *
 * Tiles blend logos into their lavender background (mix-blend-mode: multiply) to drop the
 * white box behind logos supplied without transparency. `solid` marks logos that have white
 * inside the mark on a transparent surround: they skip the blend so that white stays white.
 * `whiteText` marks a logo with white lettering, which needs a deeper tile to show.
 */
export interface Logo {
  src: string;
  name: string;
  solid?: boolean;
  whiteText?: boolean;
}

// In the client mock-up's order. No links yet.
export const clients: Logo[] = [
  { file: 'aeon.png', name: 'AEON' },
  { file: 'lucky-supermarket.png', name: 'Lucky Supermarket', solid: true },
  { file: 'ootoya.png', name: 'OOTOYA', solid: true },
  { file: 'ringer-hut.png', name: 'Ringer Hut' },
  { file: 'rosewood.png', name: 'Rosewood' },
  { file: 'emart24.png', name: 'emart24' },
  { file: 'yakiniku-like.png', name: 'Yakiniku Like', solid: true },
  { file: 'uraetei.png', name: 'Uraetei Cambodia' },
  { file: 'bijin-nabe.jpg', name: 'Bijin Nabe', solid: true },
  { file: 'le-ta-su.png', name: 'Shabu Shabu Le-Ta-Su' },
  { file: 'kyo-omakase.webp', name: 'KYO Omakase' },
  { file: 'kyo-wagyu.webp', name: 'KYO Wagyu' },
  { file: 'pepper-lunch.png', name: 'Pepper Lunch' },
  { file: 'genki-sushi.png', name: 'Genki Sushi' },
  { file: 'seigendo.webp', name: 'Seigendo Group' },
  { file: 'sofitel.png', name: 'Sofitel Phnom Penh Phokeethra' },
  { file: 'pizza-4ps.png', name: "Pizza 4P's", solid: true },
  { file: 'marugame-udon.png', name: 'Marugame Udon', solid: true },
  { file: 'azumaya.png', name: 'Azumaya Hotel' },
  { file: 'makro.png', name: 'makro' },
  { file: 'hotel-emion.png', name: 'Hotel Emion' },
  { file: 'nido.png', name: 'Yakitori Bar NIDO' },
  { file: 'sushi-box.png', name: 'Sushi Box' },
  { file: 'nagaworld.png', name: 'NagaWorld' },
  { file: 'seorae.png', name: 'Seorae', solid: true },
  { file: 'momo-paradise.png', name: 'MOMO Paradise' },
  { file: 'rice-holic.png', name: 'Rice Holic' },
  { file: 'tonkotsu-kazan.png', name: 'Tonkotsu Kazan Ramen' },
  { file: 'himawari.jpg', name: 'Himawari Hotel Apartments' },
  { file: 'shabu-shabu.png', name: 'Shabu Shabu & Sushi Buffet' },
].map(({ file, ...l }) => ({ src: `/uploads/2026/10/clients/${file}`, ...l }));

// Supplier logos, in the order the client supplied them. No links yet.
export const partners: Logo[] = [
  { file: 'azuma-foods', name: 'Azuma Foods' },
  { file: 'toba-meat', name: 'Toba Meat' },
  { file: 'tablemark', name: 'TableMark', solid: true },
  { file: 'kunihiro', name: 'Kunihiro Oyster' },
  { file: 'akj', name: 'AKJ', solid: true },
  { file: 'kaneku', name: 'Kaneku' },
  { file: 'misaki-megumi', name: 'Misaki Megumi Suisan' },
  { file: 'nakata-foods', name: 'Nakata Foods' },
  { file: 'suigei', name: 'Suigei' },
  { file: 'nihonsakari', name: 'Nihonsakari' },
  { file: 'hamada', name: 'Hamada Shuzo', solid: true },
  { file: 'nabeshima', name: 'Nabeshima' },
  { file: 'babi920', name: 'Babi920' },
  { file: 'mori-suisan', name: 'Mori Suisan', whiteText: true },
  { file: 'tsubaki', name: 'Tsubaki', solid: true },
  { file: 'asan-service', name: 'Asan Service', solid: true },
  { file: 'yamani', name: 'Yamani' },
  { file: 'japan-farm-products', name: 'Japan Farm Products' },
].map(({ file, ...l }) => ({ src: `/uploads/2026/10/partners/${file}.png`, ...l }));

/** Picks logos by name, in the order given. */
export const pick = (logos: Logo[], names: string[]) =>
  names.map((n) => {
    const logo = logos.find((l) => l.name === n);
    if (!logo) throw new Error(`Unknown logo: ${n}`);
    return logo;
  });

/** Product categories shown on the Products page and as tiles on the Home page. */
export interface Category {
  /** Anchor on the Products page (/products/#id opens that category). */
  id: string;
  image: string;
  /** CSS background-position, to keep the subject of each photo inside the banner crop. */
  focus?: string;
  title: { en: string; ja: string };
  text: { en: string; ja: string };
  /** Shown as a tile in the Home page "Our Products" grid (default true). */
  onHome?: boolean;
}

export const categories: Category[] = [
  {
    id: 'wagyu',
    image: '/uploads/2026/10/products/wagyu.png',
    title: { en: 'Wagyu &amp; Meat', ja: '和牛＆精肉' },
    text: {
      en: 'We offer premium Japanese Wagyu brands, including Miyazaki Beef. Wagyu is available in a variety of grades, such as A4 and A5, as well as different cuts. We can recommend the best products to suit your specific needs and requests.',
      ja: '宮崎牛など、日本のブランド和牛を取り扱っています。和牛には様々な種類やランク(A4/A5など)や部位がございます。お客様のリクエストに合わせて、最適な商品をご提案いたします。',
    },
  },
  {
    id: 'seafood',
    image: '/uploads/2026/10/products/seafood.png',
    title: { en: 'Fresh / Frozen Seafood', ja: '冷蔵/冷凍水産品' },
    text: {
      en: 'We import fresh seafood from Japan to Cambodia every week. We also carry a wide selection of frozen products with a long shelf life, such as frozen tuna, sea urchin, oysters, and shrimp.',
      ja: '日本からカンボジアへ新鮮な魚介類を毎週空輸しています。また冷凍マグロやウニ、牡蠣、海老など長期保存可能な冷凍の商品も多く取り揃えています。',
    },
  },
  {
    id: 'sake',
    image: '/uploads/2026/10/products/sake.png',
    title: { en: 'Sake (Alcohol)', ja: '酒(アルコール)' },
    text: {
      en: 'We offer a wide selection of sake, shochu, umeshu, and more, including internationally popular brands and new products. From options for restaurants and businesses to premium bottles, we can provide products to suit your needs.',
      ja: '日本酒や焼酎、梅酒など、世界で人気の銘柄に加え、まだカンボジアでは新しい銘柄もご用意しています。業務用から高級ボトルまで、ニーズに合わせてご用意いたします。',
    },
  },
  {
    id: 'vegetables-fruits',
    image: '/uploads/2026/10/products/vegefruits.png',
    title: { en: 'Vegetables &amp; Fruits', ja: '野菜＆果物' },
    text: {
      en: 'We offer shiso leaves grown on our own farm, vegetables imported from Japan, and seasonal Japanese fruits that are difficult to find in Cambodia’s year-round tropical climate.',
      ja: '自社農園で栽培した大葉や、日本から輸入した野菜、常夏のカンボジアでは手に入りにくい日本の旬の果物などをお求めいただけます。',
    },
  },
  {
    id: 'ingredients',
    image: '/uploads/2026/10/products/ingredients.png',
    title: { en: 'Ingredients &amp; Processed Foods', ja: '調味料＆加工食品' },
    text: {
      en: 'We offer a wide range of Japanese seasonings, including soy sauce, miso, and wasabi, as well as cooking essentials such as tempura flour and potato starch. We also carry Japanese food staples such as kamaboko, natto, and pickles.',
      ja: '醤油、味噌、わさびといった日本の調味料をはじめ、天ぷら粉や片栗粉などの粉物、かまぼこ、納豆、漬物など、副菜に欠かせない加工食品も取扱がございます。',
    },
  },
  {
    id: 'rice',
    image: '/uploads/2026/10/products/rice.png',
    focus: 'center 40%',
    title: { en: 'Rice', ja: 'お米' },
    text: {
      en: 'In addition to LOKA’s original Japonica rice, we offer premium Japanese rice brands such as Koshihikari imported from Japan, as well as convenient pre-washed rice, with a variety of options to suit your needs.',
      ja: 'LOKAオリジナルのJaponicaライスに加え、日本から輸入したコシヒカリなどのブランド米、便利な無洗米など、お客様のニーズに応じてお選びいただけます。',
    },
  },
  {
    id: 'others',
    onHome: false,
    image: '/uploads/2026/10/products/others.png',
    title: { en: 'Others', ja: 'その他' },
    text: {
      en: 'From kitchen essentials like easy-to-use plastic wrap and dehydrating sheets for food to everyday necessities such as disposable chopsticks and bento trays. Please feel free to contact us if there’s anything you need.',
      ja: '高品質なラップや食品用浸透圧脱水シートといったキッチン用品、割り箸、バラン、弁当トレーといった必需品まで取扱。必要な物がありましたらぜひご相談ください。',
    },
  },
];

import { test, expect } from '@playwright/test';
import posts from '../src/data/posts.json' with { type: 'json' };

const PAGES = [
  '/',
  '/about-us-loka/',
  '/products/',
  '/ja/',
  '/ja/about-us-loka/',
  '/ja/products/',
  '/ja/japanese-food-supplier-cambodia/',
  '/contact/',
  '/japanese-food-supplier-cambodia/',
  '/faq/',
  '/team/',
  '/news-and-events/',
  '/work-with-loka/',
  '/loka-product-list/',
  '/news/',
  '/loka-general-and-partners-catalogue-2/',
  ...posts.map((p) => `/${p.slug}/`),
];

const isMobile = (page) => page.viewportSize().width <= 1024;

test.describe('every page', () => {
  for (const path of PAGES) {
    test(`${path} renders cleanly`, async ({ page }) => {
      const errors = [];
      page.on('pageerror', (e) => errors.push(e.message));
      // Errors raised by the embedded YouTube players are third-party and outside our control
      const thirdParty = /youtube|ytimg|googlevideo|doubleclick|google\.com|gstatic/i;
      page.on('console', (m) => {
        if (m.type() !== 'error' || thirdParty.test(m.text()) || thirdParty.test(m.location().url)) return;
        errors.push(`${m.text()} @ ${m.location().url}`);
      });

      const res = await page.goto(path, { waitUntil: 'load' });
      expect(res.status()).toBe(200);
      await expect(page).toHaveTitle(/\S/);
      await expect(page.locator('header.site-header')).toBeVisible();

      // Scroll through so lazy images load, then check none are broken
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 400) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 40));
        }
      });
      await page.waitForLoadState('networkidle');
      const broken = await page.$$eval('img', (imgs) =>
        imgs.filter((i) => i.complete && i.naturalWidth === 0 && i.getAttribute('src')).map((i) => i.getAttribute('src')),
      );
      expect(broken).toEqual([]);

      // No horizontal scrolling at any breakpoint
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);

      expect(errors).toEqual([]);
    });
  }
});

test('internal links and assets resolve', async ({ page, request }) => {
  const seen = new Set();
  for (const path of PAGES) {
    await page.goto(path);
    const urls = await page.$$eval('a[href], img[src], video[src], link[rel~="icon"]', (els) =>
      els.map((e) => e.getAttribute('href') ?? e.getAttribute('src')),
    );
    for (const u of urls) {
      if (!u || !u.startsWith('/') || u.startsWith('//') || seen.has(u)) continue;
      seen.add(u);
      const res = await request.head(u);
      expect(res.status(), `broken link ${u} on ${path}`).toBeLessThan(400);
    }
  }
  expect(seen.size).toBeGreaterThan(50);
});

test('navigation menu works', async ({ page }) => {
  await page.goto('/');
  if (isMobile(page)) {
    const burger = page.getByRole('button', { name: 'Open menu' });
    await burger.click();
    const panel = page.getByRole('navigation', { name: 'Mobile' });
    await expect(panel).toBeVisible();
    await expect(burger).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Escape');
    await expect(page.locator('#mobile-nav')).toBeHidden();
    await burger.click();
    await panel.getByRole('link', { name: 'Products' }).click();
  } else {
    await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Products' }).click();
  }
  await expect(page).toHaveURL(/\/products\/$/);
  await expect(page.getByRole('heading', { name: 'Products', exact: true })).toBeVisible();
});

test('product categories open one description at a time', async ({ page }) => {
  await page.goto('/products/');
  const cats = page.locator('details.cat');
  await expect(cats).toHaveCount(7);
  await expect(page.getByText('Miyazaki Beef', { exact: false })).toBeHidden();
  await cats.nth(0).locator('summary').click();
  await expect(cats.nth(0)).toHaveAttribute('open', '');
  await expect(page.getByText('Miyazaki Beef', { exact: false })).toBeVisible();
  await cats.nth(1).locator('summary').click();
  await expect(cats.nth(1)).toHaveAttribute('open', '');
  await expect(cats.nth(0)).not.toHaveAttribute('open', '');
});

test('products page switches between English and Japanese', async ({ page }) => {
  await page.goto('/products/');
  await page.locator('a.site-header__lang').click();
  await expect(page).toHaveURL(/\/ja\/products\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'ja');
  await expect(page.getByRole('heading', { name: '取扱商品' })).toBeVisible();
  await page.locator('details.cat summary').first().click();
  await expect(page.getByText('宮崎牛など', { exact: false })).toBeVisible();
  await page.locator('a.site-header__lang').click();
  await expect(page).toHaveURL(/\/products\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('Japanese pages use Japanese text and stay on the new site', async ({ page }) => {
  await page.goto('/');
  await page.locator('a.site-header__lang').click();
  await expect(page).toHaveURL(/\/ja\/$/);
  await expect(page.getByRole('heading', { name: 'LOKAとは?' })).toBeVisible();
  // Internal links lead to the Japanese twins
  await page.locator('a.lk-btn', { hasText: 'LOKAの詳細を見る' }).click();
  await expect(page).toHaveURL(/\/ja\/about-us-loka\/$/);
  await expect(page.getByRole('heading', { name: '圧倒的な品揃え' })).toBeVisible();
  await page.goto('/ja/japanese-food-supplier-cambodia/');
  await expect(page.getByRole('heading', { name: '商品を多くのお客様に' })).toBeVisible();
});

test('language flag is hidden on pages without a Japanese version', async ({ page }) => {
  await page.goto('/contact/');
  await expect(page.locator('a.site-header__lang')).toHaveCount(0);
  await expect(page.locator('a[href*="lokajapanesefoodsbeverage.com/ja"]')).toHaveCount(0);
});

test('home product tiles open their category on the Products page', async ({ page }) => {
  await page.goto('/');
  const tiles = page.locator('a.lk-cat');
  await expect(tiles).toHaveCount(6);
  await expect(tiles.first()).toHaveText('Wagyu & Meat');
  await tiles.nth(5).click();
  await expect(page).toHaveURL(/\/products\/#rice$/);
  await expect(page.locator('details#rice')).toHaveAttribute('open', '');
});

test('FAQ accordion opens one answer at a time', async ({ page }) => {
  await page.goto('/faq/');
  const items = page.locator('details.faq__item');
  await items.nth(0).locator('summary').click();
  await expect(items.nth(0)).toHaveAttribute('open', '');
  await expect(page.getByText('Ultra-Low Temperature Freezer (-60°C) for Tuna Storage')).toBeVisible();
  await items.nth(1).locator('summary').click();
  await expect(items.nth(1)).toHaveAttribute('open', '');
  await expect(items.nth(0)).not.toHaveAttribute('open', '');
});

test('news list links to every post', async ({ page }) => {
  await page.goto('/news-and-events/');
  const links = page.locator('.post-list__title a');
  await expect(links).toHaveCount(posts.length);
  await links.first().click();
  await expect(page.getByRole('heading', { name: 'DETAIL OF NEWS & EVENTS' })).toBeVisible();
});

test('post gallery opens in a lightbox', async ({ page }) => {
  const post = posts.find((p) => p.gallery);
  await page.goto(`/${post.slug}/`);
  await page.locator('a[data-lightbox]').first().click();
  const dialog = page.locator('dialog.lightbox');
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('[data-lb-count]')).toHaveText(`1 / ${post.gallery.length}`);
  await dialog.getByRole('button', { name: 'Next image' }).click();
  await expect(dialog.locator('[data-lb-count]')).toHaveText(`2 / ${post.gallery.length}`);
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
});

test('product list PDF renders and pages', async ({ page }) => {
  await page.goto('/loka-product-list/');
  const book = page.locator('[data-flipbook]');
  await expect(book.locator('canvas').first()).toBeVisible({ timeout: 30_000 });
  await expect(book.locator('[data-page]')).toHaveText('1/32');
  await book.getByRole('button', { name: 'Next page' }).click();
  await expect(book.locator('[data-page]')).toHaveText(isMobile(page) && page.viewportSize().width < 768 ? '2/32' : '2-3/32');
});

test('contact page exposes email and Facebook', async ({ page }) => {
  await page.goto('/contact/');
  await expect(page.getByRole('link', { name: 'loka-general@seats-inc.com' })).toHaveAttribute('href', 'mailto:loka-general@seats-inc.com');
  await expect(page.getByRole('link', { name: 'LOKA’s Facebook Page' })).toHaveAttribute('href', /facebook\.com/);
});

test('unknown URLs return the 404 page', async ({ page }) => {
  const res = await page.goto('/this-page-does-not-exist/');
  expect(res.status()).toBe(404);
  await expect(page.getByRole('heading', { name: 'Not Found' })).toBeVisible();
});

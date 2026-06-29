import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const baseUrl = process.argv[2] ?? "http://127.0.0.1:5173/";
await mkdir("test-results", { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });

await page.goto(baseUrl, { waitUntil: "networkidle" });
const title = await page.title();
const h1 = await page.locator("h1").first().innerText();
const heroVisible = await page.getByText("Standardized Platform, Localized Business").isVisible();
await page.screenshot({ path: "test-results/desa360-desktop.png", fullPage: true });

await page.getByRole("button", { name: /Lihat Demo/i }).click();
await page.getByRole("button", { name: /Jalankan Langkah Berikutnya/i }).click();
await page.getByRole("button", { name: /Jalankan Langkah Berikutnya/i }).click();
const progressText = await page.getByText(/2 dari 14 langkah selesai/i).innerText();

await page.locator("select").selectOption("buyer");
await page.waitForTimeout(400);
const marketplaceHeading = await page.getByRole("heading", { name: /Belanja produk lokal/i }).innerText();
const cardCount = await page.locator("article").count();
const roleHeadings = {};
for (const role of ["farmer", "manager", "member", "regional", "government"]) {
  await page.locator("select").selectOption(role);
  await page.waitForTimeout(300);
  roleHeadings[role] = await page.locator("h1").first().innerText();
}

const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
await mobilePage.goto(baseUrl, { waitUntil: "networkidle" });
await mobilePage.screenshot({ path: "test-results/desa360-mobile.png", fullPage: true });
const mobileBodyWidth = await mobilePage.evaluate(() => document.documentElement.scrollWidth);
const mobileViewportWidth = await mobilePage.evaluate(() => window.innerWidth);

await browser.close();

const result = {
  title,
  h1,
  heroVisible,
  progressText,
  marketplaceHeading,
  cardCount,
  roleHeadings,
  mobileHorizontalOverflow: mobileBodyWidth > mobileViewportWidth
};

console.log(JSON.stringify(result, null, 2));

if (!heroVisible) throw new Error("Hero label was not visible.");
if (!progressText.includes("2 dari 14")) throw new Error("Demo did not advance to step 2.");
if (cardCount < 8) throw new Error("Marketplace did not render expected product cards.");
if (Object.keys(roleHeadings).length !== 5) throw new Error("Not all role dashboards rendered.");
if (mobileBodyWidth > mobileViewportWidth) throw new Error("Mobile viewport has horizontal overflow.");

import { expect, test } from "@playwright/test";

let context;

test.beforeAll(async ({ browser }) => {
  context = await browser.newContext();
});

test.afterAll(async () => {
  await context.close();
});

test("img hover edildiğinde grayscale class eklenmeli", async () => {
  const page = await context.newPage();
  await page.goto("http://localhost:3003");

  const img = page.locator("img").first();
  await img.hover();
  await expect(img).toHaveClass(/grayscale/);
  await page.close();
});

test("img mouseleave olunca grayscale class silinmeli", async () => {
  const page = await context.newPage();
  await page.goto("http://localhost:3003");

  const img = page.locator("img").first();
  await img.hover();
  await expect(img).toHaveClass(/grayscale/);
  await img.dispatchEvent("mouseleave");
  await expect(img).not.toHaveClass(/grayscale/);
  await page.close();
});

test("1 tuşuna basıldığında body class theme1 olmalı", async () => {
  const page = await context.newPage();
  await page.goto("http://localhost:3003");

  await page.keyboard.press("1");
  await expect(page.locator("body")).toHaveClass(/theme1/);
  await page.close();
});

test("2 tuşuna basıldığında body class theme2 olmalı", async () => {
  const page = await context.newPage();
  await page.goto("http://localhost:3003");

  await page.keyboard.press("2");
  await expect(page.locator("body")).toHaveClass(/theme2/);
  await page.close();
});

test("3 tuşuna basıldığında body class theme3 olmalı", async () => {
  const page = await context.newPage();
  await page.goto("http://localhost:3003");

  await page.keyboard.press("3");
  await expect(page.locator("body")).toHaveClass(/theme3/);
  await page.close();
});

test("Escape tuşuna basıldığında tüm theme classları kaldırılmalı", async () => {
  const page = await context.newPage();
  await page.goto("http://localhost:3003");

  await page.keyboard.press("1");
  await page.keyboard.press("Escape");
  const classList = await page.locator("body").getAttribute("class");
  expect(classList).not.toMatch(/theme[123]/);
  await page.close();
});

test("Inputa yazılan metin büyük harfe dönüşmeli", async () => {
  const page = await context.newPage();
  await page.goto("http://localhost:3003");

  const input = page.locator("#full_name");
  await input.fill("john");
  await expect(await input.inputValue()).toBe("JOHN");
  await page.close();
});

test("5 karakterden küçükken buton disabled olmalı", async () => {
  const page = await context.newPage();
  await page.goto("http://localhost:3003");

  const input = page.locator("#full_name");
  const button = page.locator('button[type="submit"]');
  await input.fill("abcd");
  await expect(button).toBeDisabled();
  await page.close();
});

test("5 karakter ve üzeri yazıldığında buton enabled olmalı", async () => {
  const page = await context.newPage();
  await page.goto("http://localhost:3003");

  const input = page.locator("#full_name");
  const button = page.locator('button[type="submit"]');
  await input.fill("abcd");
  await expect(button).toBeDisabled();
  await input.fill("abcdef");
  await expect(button).toBeEnabled();
  await page.close();
});

test("Submit edildiğinde paragraf güncellenmeli", async () => {
  const page = await context.newPage();
  await page.goto("http://localhost:3003");

  const input = page.locator("#full_name");
  const button = page.locator('button[type="submit"]');
  const result = page.locator("#submitResult");

  await input.fill("deneme");
  await expect(button).toBeEnabled(); // anında fail olsun
  await button.click();
  await expect(result).toHaveText("DENEME başarı ile kaydedildi.");
  await page.close();
});

test("Submit sonrası input alanı sıfırlanmalı", async () => {
  const page = await context.newPage();
  await page.goto("http://localhost:3003");

  const input = page.locator("#full_name");
  const button = page.locator('button[type="submit"]');

  await input.fill("deneme");
  await button.click();
  await expect(input).toHaveValue("");
  await page.close();
});

test("Submit sonrası buton disabled olmalı", async () => {
  const page = await context.newPage();
  await page.goto("http://localhost:3003");

  const input = page.locator("#full_name");
  const button = page.locator('button[type="submit"]');

  await input.fill("deneme");
  await button.click();
  await expect(button).toBeDisabled();
  await page.close();
});

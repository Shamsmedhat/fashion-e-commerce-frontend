import { expect, test, type APIRequestContext, type Page } from "@playwright/test";

const API = "http://localhost:3100/api/v1";

// Seeded by the backend's in-memory dev server.
const SHOPPER = { phone: "01000000001", password: "Shopper@123" };
const ADMIN = { phone: "01111803604", password: "Shams@123" };

const productCards = (page: Page) => page.locator("main h3");

async function logIn(page: Page, phone: string, password: string): Promise<void> {
  await page.getByLabel(/email or phone/i).fill(phone);
  await page.locator('input[type="password"]').fill(password);
  await page.getByRole("button", { name: "Login" }).click();
}

async function adminHeaders(request: APIRequestContext): Promise<Record<string, string>> {
  const response = await request.post(`${API}/users/login`, { data: ADMIN });
  const { token } = await response.json();
  return { Authorization: `Bearer ${token}` };
}

// Registers a fresh shopper with no saved address and leaves them logged in.
async function registerAndLogIn(page: Page): Promise<void> {
  const suffix = Date.now().toString().slice(-8);
  const phone = `010${suffix}`;

  await page.goto("/en/auth/register");
  await page.getByLabel("Full Name").fill("E2E Shopper");
  await page.getByLabel("Email").fill(`e2e-${suffix}@example.com`);
  await page.getByLabel("Phone number").fill(phone);
  await page.locator('input[type="password"]').nth(0).fill("Shopper@123");
  await page.locator('input[type="password"]').nth(1).fill("Shopper@123");
  await page.getByRole("button", { name: "Register" }).click();

  await expect(page).toHaveURL(/\/en\/auth\/login/);
  await logIn(page, phone, "Shopper@123");
  await expect(page.getByText(/Hello, E2E Shopper/)).toBeVisible();
}

test.describe("browsing", () => {
  test("the home page shows the catalogue sections", async ({ page }) => {
    await page.goto("/en");

    await expect(page.getByRole("link", { name: "men", exact: true }).first()).toBeVisible();
    await expect(productCards(page).first()).toBeVisible();
  });

  // Regression: every search param was forwarded to the API as a filter, so a tracking
  // parameter emptied the shop; and listings stopped at the API's default 10 products.
  test("a listing ignores tracking parameters and reaches every product through its pages", async ({
    page,
  }) => {
    await page.goto("/en/new?utm_source=newsletter&fbclid=abc");
    await expect(productCards(page)).toHaveCount(12);

    await page.getByRole("link", { name: "next" }).click();
    await expect(page).toHaveURL(/page=2/);
    await expect(productCards(page).first()).toBeVisible();
    expect(await productCards(page).count()).toBeGreaterThanOrEqual(4);
  });

  test("sorting by price orders the cards from the cheapest", async ({ page }) => {
    await page.goto("/en/new?sort=price-low-to-high");
    await expect(productCards(page)).toHaveCount(12);

    const prices = await page
      .locator("main span.text-lg.font-bold")
      .evaluateAll((nodes) =>
        nodes.map((node) => Number(node.textContent?.replace(/[^\d.]/g, ""))),
      );

    expect(prices.length).toBe(12);
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test("an empty filter result keeps the controls, so it can be undone", async ({ page }) => {
    await page.goto("/en/new?variants.color=no-such-colour");

    await expect(page.getByText("No products found")).toBeVisible();
    await expect(page.getByRole("button", { name: "filters" })).toBeVisible();
    await expect(page.getByRole("button", { name: "sort" })).toBeVisible();
  });

  test("a category page lists its products and narrows to a subcategory", async ({ page }) => {
    await page.goto("/en");
    await page.getByRole("link", { name: "men", exact: true }).first().click();
    await expect(page).toHaveURL(/\/en\/category\/men\//);
    // The list streams in after the page shell, so wait for it before counting.
    await expect(productCards(page).first()).toBeVisible();
    const all = await productCards(page).count();

    await page.getByRole("link", { name: "Shoes", exact: true }).click();
    await expect(page).toHaveURL(/men-shoes/);
    await expect.poll(() => productCards(page).count()).toBeLessThan(all);
    await expect(productCards(page).first()).toBeVisible();
  });

  // Regression: these showed a generic error page (products) or the login form (unknown URLs).
  test("unknown products and unknown pages show the 404 page", async ({ page }) => {
    const missingProduct = await page.goto("/en/products/000000000000000000000000");
    expect(missingProduct?.status()).toBe(404);
    await expect(page.getByText("Page not found")).toBeVisible();

    await page.goto("/en/products/not-an-id");
    await expect(page.getByText("Page not found")).toBeVisible();

    await page.goto("/en/store-locator");
    await expect(page.getByText("Page not found")).toBeVisible();
  });

  test("the Arabic storefront is right-to-left and translated", async ({ page }) => {
    await page.goto("/ar");

    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.getByRole("link", { name: "رجال" }).first()).toBeVisible();
  });
});

test.describe("accounts", () => {
  test("the bag asks for a login and returns to it afterwards", async ({ page }) => {
    await page.goto("/en/bag");
    await expect(page).toHaveURL(/\/en\/auth\/login\?callbackUrl=/);

    await logIn(page, SHOPPER.phone, SHOPPER.password);

    await expect(page).toHaveURL(/\/en\/bag/);
    await expect(page.getByRole("heading", { name: /shopping bag/i })).toBeVisible();
  });

  test("sign-up applies the API's password rule before sending anything", async ({ page }) => {
    await page.goto("/en/auth/register");
    await page.getByLabel("Full Name").fill("E2E Shopper");
    await page.getByLabel("Email").fill("weak@example.com");
    await page.getByLabel("Phone number").fill("01012345678");
    await page.locator('input[type="password"]').nth(0).fill("weakpassword");
    await page.locator('input[type="password"]').nth(1).fill("weakpassword");
    await page.getByRole("button", { name: "Register" }).click();

    await expect(page.locator('[id$="-form-item-message"]')).toContainText("one uppercase letter");
    await expect(page).toHaveURL(/\/en\/auth\/register/);
  });
});

test.describe("buying", () => {
  test("a new shopper adds a product, saves an address and places a cash order", async ({
    page,
  }) => {
    await registerAndLogIn(page);

    // Product page -> bag
    await page.goto("/en/new");
    await productCards(page).first().click();
    await expect(page).toHaveURL(/\/en\/products\//);
    await page.getByRole("button", { name: "add to bag" }).click();
    await expect(page.getByText(/added to bag successfully/)).toBeVisible();

    // Bag: the summary total is what will be charged, with no phantom tax line
    await page.goto("/en/bag");
    await expect(page.getByText("estimated tax")).toHaveCount(0);
    await page.getByRole("link", { name: "checkout", exact: true }).click();
    await expect(page).toHaveURL(/\/en\/checkout/);

    // Checkout: a shopper without an address used to be stuck here
    const cashButton = page.getByRole("button", { name: "cash on delivery" });
    await expect(cashButton).toBeDisabled();
    await page.getByLabel("city").fill("Cairo");
    await page.getByLabel("street").fill("12 Nile Street");
    await page.getByRole("button", { name: "Save address" }).click();
    await expect(page.getByText("Deliver to")).toBeVisible();

    await cashButton.click();
    await expect(page.getByRole("heading", { name: "order confirmed" })).toBeVisible();

    // The order emptied the bag
    await page.goto("/en/bag");
    await expect(page.getByText("your bag is empty")).toBeVisible();
    await expect(page.getByRole("button", { name: "checkout" })).toBeDisabled();
  });

  // Regression: Server Actions threw, and production builds replace a thrown error's message
  // with a generic one. The shopper never learned why the order failed.
  test("the API's reason is shown when an order cannot be placed", async ({ page, request }) => {
    await registerAndLogIn(page);

    await page.goto("/en/new");
    await productCards(page).nth(1).click();
    await expect(page).toHaveURL(/\/en\/products\//);
    const productId = page.url().split("/products/")[1];
    await page.getByRole("button", { name: "add to bag" }).click();
    await expect(page.getByText(/added to bag successfully/)).toBeVisible();

    await page.goto("/en/checkout");
    await page.getByLabel("city").fill("Cairo");
    await page.getByLabel("street").fill("12 Nile Street");
    await page.getByRole("button", { name: "Save address" }).click();
    await expect(page.getByText("Deliver to")).toBeVisible();

    // Someone else buys the last units while this shopper is on the checkout page.
    const headers = await adminHeaders(request);
    const { data } = await (await request.get(`${API}/products/${productId}`)).json();
    const setStock = (variantId: string, stock: number) =>
      request.patch(`${API}/products/${productId}/variants/${variantId}`, {
        headers,
        data: { stock },
      });

    for (const variant of data.product.variants) await setStock(variant._id, 0);

    await page.getByRole("button", { name: "cash on delivery" }).click();

    await expect(page.getByText(/Insufficient stock/)).toBeVisible();
    await expect(page.getByRole("heading", { name: "order confirmed" })).toHaveCount(0);

    // Put the stock back so the suite can run again against the same server.
    for (const variant of data.product.variants) await setStock(variant._id, variant.stock);
  });
});

// The storefront caches catalogue data for weeks and relies on the admin dashboard to tell it
// when something changed (POST /api/revalidate with the admin's token, from the dashboard's origin).
test.describe("catalogue changes made in the CMS", () => {
  const DASHBOARD_ORIGIN = "http://localhost:5173";

  test("an edit appears on the storefront once the dashboard signals it", async ({
    page,
    request,
  }) => {
    const headers = await adminHeaders(request);
    const { data } = await (await request.get(`${API}/products?limit=1&sort=name`)).json();
    const product = data.products[0];
    const renamed = `Renamed ${Date.now().toString().slice(-6)}`;

    const title = (name: string) => page.getByRole("heading", { level: 1, name });
    const rename = (name: string) =>
      request.patch(`${API}/products/${product._id}`, { headers, data: { name } });
    const revalidate = () =>
      request.post("/api/revalidate", {
        headers: { ...headers, Origin: DASHBOARD_ORIGIN },
        data: { tags: ["products", `product-${product._id}`] },
      });

    await page.goto(`/en/products/${product._id}`);
    await expect(title(product.name)).toBeVisible();

    try {
      // Without a signal, the cached page keeps showing the old name.
      expect((await rename(renamed)).status()).toBe(200);
      await page.reload();
      await expect(title(product.name)).toBeVisible();

      // Regression: the route only allowed localhost by default and answered without CORS
      // headers, so the deployed dashboard's signal never got through.
      const response = await revalidate();
      expect(response.status()).toBe(200);
      expect(response.headers()["access-control-allow-origin"]).toBe(DASHBOARD_ORIGIN);

      await expect(async () => {
        await page.reload();
        await expect(title(renamed)).toBeVisible({ timeout: 2_000 });
      }).toPass({ timeout: 20_000 });
    } finally {
      await rename(product.name);
      await revalidate();
    }
  });

  test("only an admin may trigger a revalidation", async ({ request }) => {
    const body = { data: { tags: ["products"] } };

    const anonymous = await request.post("/api/revalidate", body);

    const shopperLogin = await request.post(`${API}/users/login`, { data: SHOPPER });
    const shopper = { Authorization: `Bearer ${(await shopperLogin.json()).token}` };
    const asShopper = await request.post("/api/revalidate", { ...body, headers: shopper });

    const admin = await adminHeaders(request);
    const unknownTag = await request.post("/api/revalidate", {
      headers: admin,
      data: { tags: ["users"] },
    });
    const foreignOrigin = await request.post("/api/revalidate", {
      ...body,
      headers: { ...admin, Origin: "https://evil.example.com" },
    });

    expect(anonymous.status()).toBe(401);
    expect(asShopper.status()).toBe(403);
    expect(unknownTag.status()).toBe(400);
    // A browser on another site gets no CORS permission to read or send this request.
    expect(foreignOrigin.headers()["access-control-allow-origin"]).toBeUndefined();
  });
});

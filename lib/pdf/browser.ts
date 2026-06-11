// lib/pdf/browser.ts
// Chromium singleton. Launching costs 1–2s; a page costs ~50ms.
// The module-level promise survives warm serverless invocations.
//
// Deps:  npm i puppeteer-core @sparticuz/chromium
//        npm i -D puppeteer        (local dev only)

import type { Browser } from "puppeteer-core";

let browserPromise: Promise<Browser> | null = null;

async function launch(): Promise<Browser> {
  if (process.env.NODE_ENV === "development") {
    // Local dev: full puppeteer ships its own Chromium.
    const puppeteer = await import("puppeteer");
    return puppeteer.launch({ headless: true }) as unknown as Browser;
  }

  // Production (Vercel / Lambda)
  const [{ default: chromium }, puppeteer] = await Promise.all([
    import("@sparticuz/chromium"),
    import("puppeteer-core"),
  ]);

  return puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: true,
  });
}

export async function getBrowser(): Promise<Browser> {
  if (!browserPromise) browserPromise = launch();
  try {
    const browser = await browserPromise;
    if (!browser.connected) throw new Error("browser disconnected");
    return browser;
  } catch {
    browserPromise = launch();
    return browserPromise;
  }
}

// lib/pdf/render-resume-html.ts
// data + templateId  →  fully self-contained HTML string for Chromium.
//
// Option B: templates are styled by ONE handwritten stylesheet
// (app/resume-builder/styles/resume-print.css) — no Tailwind in templates.
// The preview imports the same file, which is what guarantees WYSIWYG.

import { readFile } from "node:fs/promises";
import path from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server.edge";


// Your existing registry: { classic: ClassicTemplate, minimal: ..., modern: ... }
import { resumeTemplates } from "@/app/resume-builder/templates";


export type TemplateId = keyof typeof resumeTemplates;

const root = process.cwd();

// Cache CSS/fonts in prod; re-read in dev so edits show up.
let cssCache: string | null = null;
let fontCache: string | null = null;
const isProd = process.env.NODE_ENV === "production";

async function loadCss(): Promise<string> {
  if (isProd && cssCache) return cssCache;
  cssCache = await readFile(
    path.join(root, "app", "resume-builder", "styles", "resume-print.css"),
    "utf8",
  );
  return cssCache;
}

/**
 * Inline self-hosted fonts as base64 so the page needs zero network and
 * `document.fonts.ready` resolves instantly. Drop the .woff2 files into
 * /public/fonts. Missing files are skipped gracefully (system font
 * fallback from the CSS font stack takes over).
 */
async function loadFonts(): Promise<string> {
  if (isProd && fontCache !== null) return fontCache;

  const faces: Array<[family: string, file: string, weight: number]> = [
    ["Inter", "inter-400.woff2", 400],
    ["Inter", "inter-600.woff2", 600],
    ["Inter", "inter-700.woff2", 700],
  ];

  const parts: string[] = [];
  for (const [family, file, weight] of faces) {
    try {
      const buf = await readFile(path.join(root, "public", "fonts", file));
      parts.push(
        `@font-face{font-family:"${family}";font-weight:${weight};` +
          `font-style:normal;font-display:block;` +
          `src:url(data:font/woff2;base64,${buf.toString("base64")}) format("woff2");}`,
      );
    } catch {
      /* font file not present — CSS fallback stack will be used */
    }
  }
  fontCache = parts.join("\n");
  return fontCache;
}

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function renderResumeHtml(
  templateId: TemplateId,
  resumeData: any, // swap for your ResumeData type from app/resume-builder/types
): Promise<string> {
  const Template = resumeTemplates[templateId];
  if (!Template) throw new Error(`Unknown template: ${String(templateId)}`);

  const [css, fonts] = await Promise.all([loadCss(), loadFonts()]);

  const body = renderToStaticMarkup(
    createElement(Template as any, { data: resumeData }),
  );

  const title = resumeData?.personal?.fullName
    ? `${resumeData.personal.fullName} — Resume`
    : "Resume";

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${escapeHtml(title)}</title>
<style>${fonts}</style>
<style>${css}</style>
</head>
<body>${body}</body>
</html>`;
}

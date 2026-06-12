// lib/pdf/render-resume-html.ts

import { readFile } from "node:fs/promises";
import path from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server.edge";

import { resumeTemplates } from "@/app/resume-builder/templates";

export type TemplateId = keyof typeof resumeTemplates;

const root = process.cwd();
const isProd = process.env.NODE_ENV === "production";

let fontCache: string | null = null;

const templateCssFiles: Record<string, string> = {
  modern: "modern.css",
  trending: "trending.css",
};

async function loadFonts(): Promise<string> {
  if (isProd && fontCache !== null) {
    return fontCache;
  }

  // const faces: Array<[string, string, number]> = [
  //   ["Inter", "inter-400.woff2", 400],
  //   ["Inter", "inter-600.woff2", 600],
  //   ["Inter", "inter-700.woff2", 700],
  // ];

  // Option A: embed Poppins instead of (or alongside) Inter
  const faces: Array<[string, string, number]> = [
    ["Poppins", "poppins-400.woff2", 400],
    ["Poppins", "poppins-500.woff2", 500],
    ["Poppins", "poppins-600.woff2", 600],
    ["Poppins", "poppins-700.woff2", 700],
    ["Poppins", "poppins-800.woff2", 800],
  ];

  const parts: string[] = [];

  for (const [family, file, weight] of faces) {
    try {
      const buf = await readFile(path.join(root, "public", "fonts", file));

      parts.push(
        `@font-face{
          font-family:"${family}";
          font-weight:${weight};
          font-style:normal;
          font-display:block;
          src:url(data:font/woff2;base64,${buf.toString(
            "base64",
          )}) format("woff2");
        }`,
      );
    } catch {
      // Font missing → browser fallback
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
  resumeData: any,
): Promise<string> {
  const Template = resumeTemplates[templateId];

  if (!Template) {
    throw new Error(`Unknown template: ${String(templateId)}`);
  }

  const cssFile = templateCssFiles[templateId] ?? "resume-print.css";

  const [fonts, commonCss, templateCss] = await Promise.all([
    loadFonts(),

    readFile(
      path.join(root, "app", "resume-builder", "styles", "resume-print.css"),
      "utf8",
    ),

    readFile(
      path.join(root, "app", "resume-builder", "styles", cssFile),
      "utf8",
    ).catch(() => ""),
  ]);

  const body = renderToStaticMarkup(
    createElement(Template as any, {
      data: resumeData,
    }),
  );

  const title = resumeData?.personal?.fullName
    ? `${resumeData.personal.fullName} — Resume`
    : "Resume";

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${escapeHtml(title)}</title>

<style>
  /* PDF renderer resets */
  *, *::before, *::after { box-sizing: border-box; }
  html, body {
    margin: 0;
    padding: 0;
    background: #fff;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  @page {
    size: A4;
    margin: 0;   /* let the .resume container control its own padding */
  }
${fonts}
</style>

<style>
${commonCss}
</style>

<style>
${templateCss}
</style>

</head>
<body>
${body}
</body>
</html>`;
}

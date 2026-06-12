// app/api/resume/export/route.ts
// POST { templateId, resumeData } → application/pdf
// Vector text, real text layer (ATS-friendly), CSS page breaks, ~50–200 KB.

import { NextRequest, NextResponse } from "next/server";

import { getBrowser } from "@/lib/pdf/browser";
import {
  renderResumeHtml,
  type TemplateId,
} from "@/lib/pdf/render-resume-html";
import { resumeTemplates } from "@/app/resume-builder/templates";

export const runtime = "nodejs"; // Chromium needs Node, not Edge
export const maxDuration = 60;   // headroom for serverless cold starts

export async function POST(req: NextRequest) {
  // ── 1. Auth ──────────────────────────────────────────────────────────
  // You gate the Download button behind login client-side; the API must be
  // gated too or anyone can hit it directly. Plug in your auth here, e.g.:
  //
  //   const session = await getSession();            // your /auth utils
  //   if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // ── 2. Validate ──────────────────────────────────────────────────────
  let body: { templateId?: string; resumeData?: unknown };
  
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  

  const { templateId, resumeData } = body;
  if (
    !templateId ||
    !(templateId in resumeTemplates) ||
    !resumeData ||
    typeof resumeData !== "object"
  ) {
    return NextResponse.json(
      { error: "Expected { templateId, resumeData }" },
      { status: 400 },
    );
  }

  // ── 3. Render data → HTML → PDF ─────────────────────────────────────
  try {
    const html = await renderResumeHtml(templateId as TemplateId, resumeData);

    const browser = await getBrowser();
    const page = await browser.newPage();
    try {
      // HTML is self-contained (fonts inlined) → no network to wait for.
      await page.setContent(html, { waitUntil: "domcontentloaded" });
      await page.evaluateHandle("document.fonts.ready");

      const pdf = await page.pdf({
        format: "a4",
        printBackground: true,   // keep template background colors
        preferCSSPageSize: true, // respect @page { size: A4; margin: 0 }
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
      });

      const fullName = (resumeData as any)?.personal?.fullName;
      const filename =
        (typeof fullName === "string" && fullName.trim()
          ? fullName.trim().replace(/\s+/g, "_")
          : "resume") + ".pdf";

      return new NextResponse(Buffer.from(pdf), {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${filename}"`,
          "Cache-Control": "private, no-store",
        },
      });
    } finally {
      await page.close(); // close the PAGE, never the shared browser
    }
  } catch (err) {
    console.error("[resume/export]", err);
    return NextResponse.json(
      { error: "PDF generation failed" },
      { status: 500 },
    );
  }
}

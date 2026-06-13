"use client";

// app/resume-builder/components/ResumePreview.tsx
// CHANGES vs your original:
//   1. REMOVED: html-to-image, jsPDF, all canvas/slicing code, resumeRef-based capture
//   2. ADDED: resume-print.css import (same stylesheet the server injects)
//   3. handleDownload now POSTs data to /api/resume/export and saves the blob
//   4. Sheet renders at FIXED A4 width (794px) and scales to fit the panel
//      with transform:scale() — display size changes, layout never does
//   5. Dashed page-break guides every 1123px (accurate: same metrics as PDF)

import { useEffect, useRef, useState } from "react";

import "@/app/resume-builder/styles/resume-print.css";

import { resumeTemplates } from "../templates";
import { useResumeStore } from "../store/useResumeStore";
import { useAuth } from "@/app/hooks/useAuth";

type Props = {
  resumeData: any;
};

const A4_WIDTH_PX = 794; // 210mm @ 96dpi
const A4_HEIGHT_PX = 1123; // 297mm @ 96dpi

export default function ResumePreview({ resumeData }: Props) {
  const { selectedTemplate } = useResumeStore();
  const { user } = useAuth();
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Scale-to-fit + page count
  const panelRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [sheetHeight, setSheetHeight] = useState(A4_HEIGHT_PX);

  useEffect(() => {
    const panel = panelRef.current;
    const sheet = sheetRef.current;
    if (!panel || !sheet) return;

    const update = () => {
      const available = panel.clientWidth - 64; // breathing room
      setScale(Math.min(1, available / A4_WIDTH_PX));
      setSheetHeight(Math.max(sheet.scrollHeight, A4_HEIGHT_PX));
    };
    update();

    const ro = new ResizeObserver(update);
    ro.observe(panel);
    ro.observe(sheet);
    return () => ro.disconnect();
  }, [selectedTemplate, resumeData]);

  const Template =
    resumeTemplates[selectedTemplate as keyof typeof resumeTemplates];

    

  if (!Template) {
    return <div>Template not found</div>;
  }

  if (selectedTemplate === "classic") {
  return (
    <div className="flex items-center justify-center h-full text-center text-sm text-zinc-400 dark:text-zinc-600">
      Classic template is temporarily unavailable.
    </div>
  );
}
  const pageCount = Math.max(1, Math.ceil(sheetHeight / A4_HEIGHT_PX));

  const handleDownload = async () => {
    setDownloading(true);
    setError(null);
    try {
      const res = await fetch("/api/resume/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId: selectedTemplate, resumeData }),
      });
      if (!res.ok) throw new Error(`Export failed (${res.status})`);

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download =
        (resumeData?.personal?.fullName?.replace(/\s+/g, "_") || "resume") +
        ".pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      setError("Could not generate the PDF. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  const handleLogin = () => {
    window.location.href = "/login";
  };

  return (
    <section className="flex-1 min-w-0 h-full flex flex-col bg-zinc-100 dark:bg-zinc-950">
      {/* Sticky toolbar */}
      <div className="shrink-0 flex items-center justify-between px-6 py-3 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          Preview · {pageCount} page{pageCount > 1 ? "s" : ""}
        </span>
        {user ? (
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="px-4 py-2 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {downloading ? "Generating PDF…" : "Download PDF"}
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          >
            Sign in to Download
          </button>
        )}
      </div>

      {error && (
        <p className="shrink-0 px-6 py-2 text-sm text-red-600 bg-red-50 dark:bg-red-950/40">
          {error}
        </p>
      )}

      {/* Scrollable document area */}
      <div ref={panelRef} className="flex-1 overflow-auto">
        <div
          className="mx-auto py-8 px-4"
          style={{
            width: A4_WIDTH_PX * scale + 32,
            height: sheetHeight * scale + 64,
          }}
        >
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              width: A4_WIDTH_PX,
            }}
            className="relative shadow-2xl ring-1 ring-black/5 dark:ring-white/5"
          >
            {/* The sheet — fixed A4 width, same CSS as the PDF */}
            <div ref={sheetRef} style={{ width: A4_WIDTH_PX }}>
              <Template data={resumeData} />
            </div>

            {/* Page-break guides (accurate — exporter uses same metrics) */}
            {Array.from({ length: pageCount - 1 }, (_, i) => (
              <div
                key={i}
                aria-hidden
                className="pointer-events-none absolute left-0 right-0 border-t border-dashed border-red-400/60"
                style={{ top: (i + 1) * A4_HEIGHT_PX }}
              >
                <span className="absolute -top-5 right-2 text-[10px] text-red-400/90 bg-white/80 dark:bg-zinc-900/80 px-1.5 py-0.5 rounded">
                  page {i + 2}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
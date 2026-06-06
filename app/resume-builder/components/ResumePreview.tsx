"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

import { resumeTemplates } from "../templates";
import { useResumeStore } from "../store/useResumeStore";
import { useAuth } from "@/app/hooks/useAuth";

type Props = {
  resumeData: any;
};

export default function ResumePreview({ resumeData }: Props) {
  const { selectedTemplate } = useResumeStore();
  const { user } = useAuth();
  const resumeRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const Template =
    resumeTemplates[selectedTemplate as keyof typeof resumeTemplates];

  if (!Template) {
    return <div>Template not found</div>;
  }

  const handleDownload = async () => {
    if (!resumeRef.current) return;
    setDownloading(true);
    try {
      // toPng uses SVG foreignObject — inherits the browser's CSS engine,
      // so lab(), oklch(), and other CSS Color Level 4 functions all work.
      const dataUrl = await toPng(resumeRef.current, {
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });

      // Measure the rendered element to compute correct PDF proportions
      const { offsetWidth: elW, offsetHeight: elH } = resumeRef.current;
      const pdf = new jsPDF({ unit: "px", format: [elW, elH], orientation: "portrait" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();

      // If content fits on one page, add directly; otherwise split into A4 pages
      if (elH <= elW * (297 / 210)) {
        pdf.addImage(dataUrl, "PNG", 0, 0, pageW, pageH);
      } else {
        // Revert to A4 and slice
        const a4Pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
        const a4W = a4Pdf.internal.pageSize.getWidth();
        const a4H = a4Pdf.internal.pageSize.getHeight();
        const img = new Image();
        img.src = dataUrl;
        await new Promise<void>((resolve) => { img.onload = () => resolve(); });
        const pxPerMm = img.width / a4W;
        let yOffset = 0;
        while (yOffset < img.height) {
          const sliceH = Math.min(a4H * pxPerMm, img.height - yOffset);
          const pageCanvas = document.createElement("canvas");
          pageCanvas.width = img.width;
          pageCanvas.height = sliceH;
          const ctx = pageCanvas.getContext("2d")!;
          ctx.drawImage(img, 0, -yOffset);
          a4Pdf.addImage(pageCanvas.toDataURL("image/png"), "PNG", 0, 0, a4W, sliceH / pxPerMm);
          yOffset += sliceH;
          if (yOffset < img.height) a4Pdf.addPage();
        }
        const filename = `${resumeData?.personal?.fullName?.replace(/\s+/g, "_") || "resume"}.pdf`;
        a4Pdf.save(filename);
        return;
      }

      const filename = `${resumeData?.personal?.fullName?.replace(/\s+/g, "_") || "resume"}.pdf`;
      pdf.save(filename);
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
          Preview
        </span>
        {user ? (
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="px-4 py-2 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {downloading ? "Preparing PDF…" : "Download PDF"}
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

      {/* Scrollable document area */}
      <div className="flex-1 overflow-auto">
        <div className="flex justify-center py-8 px-4 min-w-fit">
          <div
            ref={resumeRef}
            className="shadow-2xl ring-1 ring-black/5 dark:ring-white/5"
          >
            <Template data={resumeData} />
          </div>
        </div>
      </div>

    </section>
  );
}
'use client'
// app/resume-export/[id]/page.tsx

import { notFound } from "next/navigation";
import { resumeTemplates } from "@/app/resume-builder/templates";
import type { ResumeData } from "@/app/resume-builder/types/resume";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

async function getResume(id: string) {
  // Fetch from DB
  // Example:
  // const resume = await prisma.resume.findUnique({ where: { id } });

  return {
    templateId: "modern",
    resumeData: {
      personal: {
        fullName: "John Doe",
      },
    },
  };
}

export default async function ResumeExportPage({ params }: Props) {
  const { id } = await params;

  const resume = await getResume(id);

  if (!resume) {
    notFound();
  }

  const Template =
    resumeTemplates[
    resume.templateId as keyof typeof resumeTemplates
    ];

  if (!Template) {
    notFound();
  }

  return (
    <html>
      <head>
        <title>Resume Export</title>

        <style>{`
          * {
            box-sizing: border-box;
          }

          html,
          body {
            margin: 0;
            padding: 0;
            background: white;
          }

          @page {
            size: A4;
            margin: 0;
          }

          .page {
            width: 794px;
            min-height: 1123px;
            margin: 0 auto;
            background: white;
          }

          @media print {
            body {
              margin: 0;
            }

            .page {
              margin: 0;
              box-shadow: none;
            }
          }
        `}</style>
      </head>

      <body>
        <div className="page">
          <Template data={resume.resumeData as ResumeData} />        </div>
      </body>
    </html>
  );
}
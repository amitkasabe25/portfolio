import { ResumeData } from "@/app/resume-builder/types/resume";
import "@/app/resume-builder/styles/minimal.css";

// MinimalTemplate — server-renderable version.
// Same visual design as before; all styling now lives in resume-print.css
// (scoped under .resume.minimal), so the PDF export and the preview share it.
// No "use client", no hooks, no Tailwind, no dark: variants (a resume sheet
// is always white paper, even when the app UI is in dark mode).

type Props = {
  data: ResumeData;
};

export default function MinimalTemplate({ data }: Props) {
  if (!data) {
    return <div className="resume minimal" />;
  }

  return (
    <div className="resume minimal">
      {/* ── Header ─────────────────────────────── */}
      <header className="m-header">
        <h1 className="m-name">{data.personal?.fullName || "Your Name"}</h1>

        {data.personal?.title && (
          <p className="m-title">{data.personal.title}</p>
        )}

        <div className="m-contact">
          {data.personal?.email && (
            <ContactItem icon="✉" value={data.personal.email} />
          )}
          {data.personal?.phone && (
            <ContactItem icon="✆" value={data.personal.phone} />
          )}
          {data.personal?.location && (
            <ContactItem icon="⌖" value={data.personal.location} />
          )}
        </div>
      </header>

      {/* ── Summary ────────────────────────────── */}
      {data.summary && (
        <ResumeSection label="Summary">
          <p className="m-summary">{data.summary}</p>
        </ResumeSection>
      )}

      {/* ── Experience ─────────────────────────── */}
      {data.experience && data.experience.length > 0 && (
        <ResumeSection label="Experience">
          <div className="m-stack-lg">
            {data.experience.map((exp, idx) => (
              <div key={idx} className="entry m-entry">
                <div>
                  <h3 className="m-heading">{exp.company}</h3>
                  <p className="m-sub">{exp.title}</p>
                </div>
                <span className="m-dates">{exp.date}</span>
                {exp.points?.length > 0 && (
                  <ul className="m-points">
                    {exp.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </ResumeSection>
      )}

      {/* ── Skills ─────────────────────────────── */}
      {data.skills && data.skills.length > 0 && (
        <ResumeSection label="Skills">
          <ul className="m-skills">
            {data.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </ResumeSection>
      )}

      {/* ── Education ──────────────────────────── */}
      {data.education && data.education.length > 0 && (
        <ResumeSection label="Education">
          <div className="m-stack-md">
            {data.education.map((edu, idx) => (
              <div key={idx} className="edu-item m-row">
                <div>
                  <h3 className="m-heading">{edu.institution}</h3>
                  <p className="m-sub">{edu.degree}</p>
                </div>
                <span className="m-dates">
                  {edu.startYear} – {edu.endYear}
                </span>
              </div>
            ))}
          </div>
        </ResumeSection>
      )}

      {/* ── Projects ───────────────────────────── */}
      {data.projects && data.projects.length > 0 && (
        <ResumeSection label="Projects">
          <div className="m-stack-md">
            {data.projects.map((project, idx) => (
              <div key={idx} className="project">
                <h3 className="m-heading">{project.title}</h3>
                <p className="m-desc">{project.description}</p>
                {project.technologies && (
                  <p className="m-tech">{project.technologies}</p>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="m-link"
                  >
                    {project.link}
                  </a>
                )}
              </div>
            ))}
          </div>
        </ResumeSection>
      )}
    </div>
  );
}

// ── Sub-components (pure — fine to keep) ────────────────────────────

function ResumeSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="m-section">
      <div className="m-section-head">
        <span className="m-label">{label}</span>
        <div className="m-rule" />
      </div>
      {children}
    </section>
  );
}

function ContactItem({ icon, value }: { icon: string; value: string }) {
  return (
    <span className="m-contact-item">
      <span className="m-icon">{icon}</span>
      <span>{value}</span>
    </span>
  );
}
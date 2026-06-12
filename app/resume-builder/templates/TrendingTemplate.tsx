import { ResumeData } from "@/app/resume-builder/types/resume";
import "@/app/resume-builder/styles/trending.css";

type Props = {
  data: ResumeData;
};

export default function TrendingTemplate({ data }: Props) {
  if (!data) {
    return <div className="resume trending" />;
  }

  return (
    <div className="resume trending">
      {/* HEADER */}
      <header className="t-header">
        <h1 className="t-name">
          {data.personal?.fullName || "Your Name"}
        </h1>

        <div className="t-contact">
          {data.personal?.phone && (
            <div>
              <strong>Mobile:</strong> {data.personal.phone}
            </div>
          )}

          {data.personal?.email && (
            <div>
              <strong>Email:</strong> {data.personal.email}
            </div>
          )}

          {data.personal?.location && (
            <div>
              <strong>Location:</strong> {data.personal.location}
            </div>
          )}
        </div>
      </header>

      {/* SUMMARY */}
      {data.summary && (
        <section className="t-section">
          <h2 className="t-section-title">
            PROFESSIONAL SUMMARY
          </h2>

          <p className="t-summary">
            {data.summary}
          </p>
        </section>
      )}

      {/* EXPERIENCE */}
      {data.experience?.length > 0 && (
        <section className="t-section">
          <h2 className="t-section-title">
            PROFESSIONAL EXPERIENCE
          </h2>

          {data.experience.map((exp, idx) => (
            <div key={idx} className="t-job">
              <div className="t-job-top">
                <div className="t-company">
                  {exp.company}
                </div>

                <div className="t-date">
                  {exp.date}
                </div>
              </div>

              <div className="t-role">
                {exp.title}
              </div>

              {exp.points?.length > 0 && (
                <ul className="t-points">
                  {exp.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* SKILLS */}
      {data.skills?.length > 0 && (
        <section className="t-section">
          <h2 className="t-section-title">
            SKILLS & TECHNOLOGIES
          </h2>

          <div className="t-skills">
            {data.skills.join(", ")}
          </div>
        </section>
      )}

      {/* EDUCATION */}
      {data.education?.length > 0 && (
        <section className="t-section">
          <h2 className="t-section-title">
            EDUCATION
          </h2>

          {data.education.map((edu, idx) => (
            <div key={idx} className="t-education">
              <div className="t-company">
                {edu.institution}
              </div>

              <div>{edu.degree}</div>

              <div className="t-date">
                {edu.startYear} - {edu.endYear}
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
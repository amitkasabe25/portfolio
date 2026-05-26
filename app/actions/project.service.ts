import { createClient } from "../lib/supabase/server";

export async function getProjects() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select(
      `
      *,
      project_technologies (
        technology
      )
    `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data.map((project: any) => ({
    id: project.id,

    name: project.title || "Untitled Project",

    desc: project.description || "No description available.",

    org: project.organization || "Unknown Organization",

    year: project.year || "2025",

    role: project.role || "Developer",

    icon: "ti-server",

    orgIcon: "ti-building",

    tags:
      project.project_technologies?.map((tech: any) => tech.technology) || [],

    metrics: [
      {
        label: project.metric_1_label,
        val: project.metric_1_value,
      },
      {
        label: project.metric_2_label,
        val: project.metric_2_value,
      },
      {
        label: project.metric_3_label,
        val: project.metric_3_value,
      },
    ].filter((metric) => metric.label && metric.val),

    badges: [
      {
        label: project.category || "General",
        type: "gov",
      },
      {
        label: project.status || "Active",
        type: "live",
      },
    ],

    filters: [project.category || "General"],
  }));
}

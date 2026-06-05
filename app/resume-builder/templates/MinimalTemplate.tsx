import { ResumeData } from "@/app/resume-builder/types/resume";

type Props = {
  data: ResumeData;
};

export default function ModernTemplate({ data }: Props) {
  return (
    <div className="bg-white p-10">
      <h1 className="text-4xl font-bold">
        {data.personal?.fullName}
      </h1>

      <p>{data.summary}</p>
    </div>
  );
}
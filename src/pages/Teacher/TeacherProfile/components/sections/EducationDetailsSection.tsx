import { Card, Descriptions, Empty, Tag } from "antd";
import type { TTeacher } from "../../../../../types/teacher.types";

type EducationDetailsSectionProps = {
  teacher: TTeacher;
};

const EducationDetailsSection = ({ teacher }: EducationDetailsSectionProps) => {
  const edu = teacher.education;

  if (!edu.school && !edu.college && !edu.graduation && !edu.post_graduation) {
    return (
      <Card title="Academic Credentials" className="shadow-sm border-gray-100">
        <Empty description="No academic history found. Please add your credentials." />
      </Card>
    );
  }

  return (
    <Card title="Academic Credentials" className="shadow-sm border-gray-100">
      <div className="space-y-6!">
        {/* Postgraduate Details */}
        {edu.post_graduation && (
          <Descriptions
            title="Post Graduation"
            column={{ xs: 1, sm: 2 }}
            layout="vertical"
            bordered
            size="small"
          >
            <Descriptions.Item label="University Name">
              <span className="font-semibold">{edu.post_graduation.name}</span>
            </Descriptions.Item>

            <Descriptions.Item label="Department">
              {edu.post_graduation.department ?? "N/A"}
            </Descriptions.Item>

            <Descriptions.Item label="University Type">
              {edu.post_graduation.type ?? "N/A"}
            </Descriptions.Item>

            <Descriptions.Item label="Result (CGPA/Grade)">
              <Tag color="purple">{edu.post_graduation.grade ?? "N/A"}</Tag>
            </Descriptions.Item>

            <Descriptions.Item label="Status" className="capitalize">
              {edu.post_graduation.status ?? "N/A"}
            </Descriptions.Item>

            <Descriptions.Item label="Passing Year">
              {edu.post_graduation.year_of_passing ?? "N/A"}
            </Descriptions.Item>
          </Descriptions>
        )}

        {/* Graduation Details */}
        {edu.graduation && (
          <Descriptions
            title="Graduation"
            column={{ xs: 1, sm: 2 }}
            layout="vertical"
            bordered
            size="small"
          >
            <Descriptions.Item label="University Name">
              <span className="font-semibold">{edu.graduation.name}</span>
            </Descriptions.Item>

            <Descriptions.Item label="Department">
              {edu.graduation.department ?? "N/A"}
            </Descriptions.Item>

            <Descriptions.Item label="University Type">
              <span className="capitalize">{edu.graduation.type ?? "N/A"}</span>
            </Descriptions.Item>

            <Descriptions.Item label="Result (CGPA/Grade)">
              <Tag color="blue">{edu.graduation.grade ?? "N/A"}</Tag>
            </Descriptions.Item>

            <Descriptions.Item label="Status" className="capitalize">
              {edu.graduation.status ?? "N/A"}
            </Descriptions.Item>

            <Descriptions.Item label="Passing Year">
              {edu.graduation.year_of_passing ?? "N/A"}
            </Descriptions.Item>
          </Descriptions>
        )}

        {/* College / HSC Details */}
        {edu.college && (
          <Descriptions
            title="College (HSC / Equivalent)"
            column={{ xs: 1, sm: 2 }}
            layout="vertical"
            bordered
            size="small"
          >
            <Descriptions.Item label="College Name">
              <span className="font-semibold">{edu.college.name}</span>
            </Descriptions.Item>

            <Descriptions.Item label="Group">
              {edu.college.group ?? "N/A"}
            </Descriptions.Item>

            <Descriptions.Item label="Education Board">
              {edu.college.board ?? "N/A"}
            </Descriptions.Item>

            <Descriptions.Item label="Curriculum">
              {edu.college.curriculum ?? "N/A"}
            </Descriptions.Item>

            <Descriptions.Item label="Result (GPA/Grade)">
              <Tag color="green">{edu.college.grade ?? "N/A"}</Tag>
            </Descriptions.Item>

            <Descriptions.Item label="Passing Year">
              {edu.college.year_of_passing ?? "N/A"}
            </Descriptions.Item>
          </Descriptions>
        )}

        {/* School / SSC Details */}
        {edu.school && (
          <Descriptions
            title="School (SSC / Equivalent)"
            column={{ xs: 1, sm: 2 }}
            layout="vertical"
            bordered
            size="small"
          >
            <Descriptions.Item label="School Name">
              <span className="font-semibold">{edu.school.name}</span>
            </Descriptions.Item>

            <Descriptions.Item label="Group">
              {edu.school.group ?? "N/A"}
            </Descriptions.Item>

            <Descriptions.Item label="Education Board">
              {edu.school.board ?? "N/A"}
            </Descriptions.Item>

            <Descriptions.Item label="Curriculum">
              {edu.school.curriculum ?? "N/A"}
            </Descriptions.Item>

            <Descriptions.Item label="Result (GPA/Grade)">
              <Tag color="warning">{edu.school.grade ?? "N/A"}</Tag>
            </Descriptions.Item>

            <Descriptions.Item label="Passing Year">
              {edu.school.year_of_passing ?? "N/A"}
            </Descriptions.Item>
          </Descriptions>
        )}
      </div>
    </Card>
  );
};

export default EducationDetailsSection;

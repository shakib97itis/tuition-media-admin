import { Card, Descriptions, Empty, Tag } from "antd";
import type { TTeacher } from "../../../../../types/teacher.types";
import { safeRender } from "../../../../../utils/format";

type EducationDetailsSectionProps = {
  teacher: TTeacher;
};

const EducationDetailsSection = ({ teacher }: EducationDetailsSectionProps) => {
  const edu = teacher?.education;

  // Check if any academic section exists
  const hasAcademicHistory =
    edu?.school || edu?.college || edu?.graduation || edu?.post_graduation;

  if (!hasAcademicHistory) {
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
        {edu?.post_graduation && (
          <Descriptions
            title="Post Graduation"
            column={{ xs: 1, sm: 2 }}
            layout="vertical"
            bordered
            size="small"
          >
            <Descriptions.Item label="University Name">
              <span className="font-semibold">
                {safeRender(edu.post_graduation?.name)}
              </span>
            </Descriptions.Item>

            <Descriptions.Item label="Department">
              {safeRender(edu.post_graduation?.department)}
            </Descriptions.Item>

            <Descriptions.Item label="University Type">
              {safeRender(edu.post_graduation?.type)}
            </Descriptions.Item>

            <Descriptions.Item label="Result (CGPA/Grade)">
              <Tag color="purple">{safeRender(edu.post_graduation?.grade)}</Tag>
            </Descriptions.Item>

            <Descriptions.Item label="Status" className="capitalize">
              {safeRender(edu.post_graduation?.status)}
            </Descriptions.Item>

            <Descriptions.Item label="Passing Year">
              {safeRender(edu.post_graduation?.year_of_passing)}
            </Descriptions.Item>
          </Descriptions>
        )}

        {/* Graduation Details */}
        {edu?.graduation && (
          <Descriptions
            title="Graduation"
            column={{ xs: 1, sm: 2 }}
            layout="vertical"
            bordered
            size="small"
          >
            <Descriptions.Item label="University Name">
              <span className="font-semibold">
                {safeRender(edu.graduation?.name)}
              </span>
            </Descriptions.Item>

            <Descriptions.Item label="Department">
              {safeRender(edu.graduation?.department)}
            </Descriptions.Item>

            <Descriptions.Item label="University Type">
              <span className="capitalize">
                {safeRender(edu.graduation?.type)}
              </span>
            </Descriptions.Item>

            <Descriptions.Item label="Result (CGPA/Grade)">
              <Tag color="blue">{safeRender(edu.graduation?.grade)}</Tag>
            </Descriptions.Item>

            <Descriptions.Item label="Status" className="capitalize">
              {safeRender(edu.graduation?.status)}
            </Descriptions.Item>

            <Descriptions.Item label="Passing Year">
              {safeRender(edu.graduation?.year_of_passing)}
            </Descriptions.Item>
          </Descriptions>
        )}

        {/* College / HSC Details */}
        {edu?.college && (
          <Descriptions
            title="College (HSC / Equivalent)"
            column={{ xs: 1, sm: 2 }}
            layout="vertical"
            bordered
            size="small"
          >
            <Descriptions.Item label="College Name">
              <span className="font-semibold">
                {safeRender(edu.college?.name)}
              </span>
            </Descriptions.Item>

            <Descriptions.Item label="Group">
              {safeRender(edu.college?.group)}
            </Descriptions.Item>

            <Descriptions.Item label="Education Board">
              {safeRender(edu.college?.board)}
            </Descriptions.Item>

            <Descriptions.Item label="Curriculum">
              {safeRender(edu.college?.curriculum)}
            </Descriptions.Item>

            <Descriptions.Item label="Result (GPA/Grade)">
              <Tag color="green">{safeRender(edu.college?.grade)}</Tag>
            </Descriptions.Item>

            <Descriptions.Item label="Passing Year">
              {safeRender(edu.college?.year_of_passing)}
            </Descriptions.Item>
          </Descriptions>
        )}

        {/* School / SSC Details */}
        {edu?.school && (
          <Descriptions
            title="School (SSC / Equivalent)"
            column={{ xs: 1, sm: 2 }}
            layout="vertical"
            bordered
            size="small"
          >
            <Descriptions.Item label="School Name">
              <span className="font-semibold">
                {safeRender(edu.school?.name)}
              </span>
            </Descriptions.Item>

            <Descriptions.Item label="Group">
              {safeRender(edu.school?.group)}
            </Descriptions.Item>

            <Descriptions.Item label="Education Board">
              {safeRender(edu.school?.board)}
            </Descriptions.Item>

            <Descriptions.Item label="Curriculum">
              {safeRender(edu.school?.curriculum)}
            </Descriptions.Item>

            <Descriptions.Item label="Result (GPA/Grade)">
              <Tag color="warning">{safeRender(edu.school?.grade)}</Tag>
            </Descriptions.Item>

            <Descriptions.Item label="Passing Year">
              {safeRender(edu.school?.year_of_passing)}
            </Descriptions.Item>
          </Descriptions>
        )}
      </div>
    </Card>
  );
};

export default EducationDetailsSection;

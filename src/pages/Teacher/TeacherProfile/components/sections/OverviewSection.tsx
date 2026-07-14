import { Card, Descriptions } from "antd";
import moment from "moment";
import type { TTeacher } from "../../../../../types/teacher.types";
import { formatDate, safeRender } from "../../../../../utils/format";

type OverviewSectionProps = {
  teacher: TTeacher;
};

const OverviewSection = ({ teacher }: OverviewSectionProps) => {
  // Safe handling for Age calculation
  const getAge = (dob?: string | Date) => {
    if (!dob) return null;
    const date = moment(dob);
    return date.isValid() ? moment().diff(date, "years") : null;
  };

  const dobDisplay = teacher.date_of_birth
    ? `${formatDate(teacher.date_of_birth)} - (${getAge(teacher.date_of_birth) ?? 0} years old)`
    : "N/A";

  return (
    <Card
      title="Overview & Personal Details"
      className="shadow-sm border-gray-100"
    >
      <div className="space-y-6!">
        <Card title="About Me" size="small" type="inner">
          <p className="text-gray-600 leading-relaxed m-0 whitespace-pre-line">
            {safeRender(teacher?.about_me, "No about me content provided")}
          </p>
        </Card>

        <Descriptions
          title="Personal Information"
          column={{ xs: 1, sm: 2 }}
          layout="vertical"
          bordered
          size="small"
        >
          <Descriptions.Item label="Full Name">
            {safeRender(teacher?.full_name)}
          </Descriptions.Item>

          <Descriptions.Item label="Phone Number">
            {safeRender(teacher?.phone)}
          </Descriptions.Item>

          <Descriptions.Item label="Additional Phone Number">
            {safeRender(teacher?.additional_phone)}
          </Descriptions.Item>

          <Descriptions.Item label="Email" className="capitalize">
            {safeRender(teacher?.email)}
          </Descriptions.Item>

          <Descriptions.Item label="Gender" className="capitalize">
            {safeRender(teacher?.gender)}
          </Descriptions.Item>

          <Descriptions.Item label="Religion">
            {safeRender(teacher?.religion)}
          </Descriptions.Item>

          <Descriptions.Item label="Date of Birth">
            {dobDisplay}
          </Descriptions.Item>

          <Descriptions.Item label="Blood Group">
            {safeRender(teacher?.blood_group)}
          </Descriptions.Item>

          <Descriptions.Item label="Marital Status" className="capitalize">
            {safeRender(teacher?.marital_status)}
          </Descriptions.Item>

          <Descriptions.Item label="Serial Number">
            {safeRender(teacher?.serial_number)}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions
          title="Address Details"
          column={{ xs: 1, sm: 2 }}
          layout="vertical"
          bordered
          size="small"
        >
          <Descriptions.Item label="Present Address">
            {safeRender(teacher?.present_address)}
          </Descriptions.Item>
          <Descriptions.Item label="Permanent Address">
            {safeRender(teacher?.permanent_address)}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </Card>
  );
};

export default OverviewSection;

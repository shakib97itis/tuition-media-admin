import { Card, Descriptions } from "antd";
import moment from "moment";
import type { TTeacher } from "../../../../../types/teacher.types";
import { formatDate } from "../../TeacherProfile";

type OverviewSectionProps = {
  teacher: TTeacher;
};

const OverviewSection = ({ teacher }: OverviewSectionProps) => (
  <Card
    title="Overview & Personal Details"
    className="shadow-sm border-gray-100"
  >
    <div className="space-y-6!">
      {teacher.about_me && (
        <Card title="About Me" size="small" type="inner">
          <p className="text-gray-600 leading-relaxed m-0 whitespace-pre-line">
            {teacher.about_me}
          </p>
        </Card>
      )}

      <Descriptions
        title="Personal Information"
        column={{ xs: 1, sm: 2 }}
        layout="vertical"
        bordered
        size="small"
      >
        <Descriptions.Item label="Full Name">
          {teacher.full_name ?? "N/A"}
        </Descriptions.Item>

        <Descriptions.Item label="Phone Number">
          {teacher.phone ?? "N/A"}
        </Descriptions.Item>

        <Descriptions.Item label="Additional Phone Number">
          {teacher.additional_phone ?? "N/A"}
        </Descriptions.Item>

        <Descriptions.Item label="Email" className="capitalize">
          {teacher.email ?? "N/A"}
        </Descriptions.Item>

        <Descriptions.Item label="Gender" className="capitalize">
          {teacher.gender ?? "N/A"}
        </Descriptions.Item>

        <Descriptions.Item label="Religion">
          {teacher.religion ?? "N/A"}
        </Descriptions.Item>

        <Descriptions.Item label="Date of Birth">
          {formatDate(teacher.date_of_birth)} - (
          {moment().diff(moment(teacher.date_of_birth), "years")} years old)
        </Descriptions.Item>

        <Descriptions.Item label="Blood Group">
          {teacher.blood_group ?? "N/A"}
        </Descriptions.Item>

        <Descriptions.Item label="Marital Status" className="capitalize">
          {teacher.marital_status ?? "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Serial Number">
          {teacher.serial_number ?? "N/A"}
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
          {teacher.present_address ?? "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Permanent Address">
          {teacher.permanent_address ?? "N/A"}
        </Descriptions.Item>
      </Descriptions>
    </div>
  </Card>
);

export default OverviewSection;

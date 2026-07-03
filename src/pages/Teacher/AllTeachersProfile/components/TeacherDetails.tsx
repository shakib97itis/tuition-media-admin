// * This component is currently not in use, Keeping this for future.

import { Tabs, Descriptions, Tag, Avatar, Image, Card, Space } from "antd";
import type { TTeacher } from "../../../../types/teacher.types";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

export default function TeacherDetails({ teacher }: { teacher: TTeacher }) {
  // Format Date Safely
  const formatDate = (date?: Date | string) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // 1. Personal & Contact Tab Content
  const personalItems = [
    { label: "Full Name", children: teacher.full_name, span: 2 },
    { label: "Email", children: teacher.email, span: 2 },
    { label: "Primary Phone", children: teacher.phone },
    { label: "Additional Phone", children: teacher.additional_phone || "N/A" },
    {
      label: "Gender",
      children: <span className="capitalize">{teacher.gender}</span>,
    },
    { label: "Date of Birth", children: formatDate(teacher.date_of_birth) },
    {
      label: "Blood Group",
      children: teacher.blood_group ? (
        <Tag color="red">{teacher.blood_group}</Tag>
      ) : (
        "N/A"
      ),
    },
    { label: "Religion", children: teacher.religion || "N/A" },
    {
      label: "Marital Status",
      children: (
        <span className="capitalize">{teacher.marital_status || "N/A"}</span>
      ),
    },
    {
      label: "Present Address",
      children: teacher.present_address || "N/A",
      span: 3,
    },
    {
      label: "Permanent Address",
      children: teacher.permanent_address || "N/A",
      span: 3,
    },
  ];

  const parentItems = teacher.parents_info
    ? [
        { label: "Father's Name", children: teacher.parents_info.father_name },
        {
          label: "Father's Phone",
          children: teacher.parents_info.father_phone,
        },
        { label: "Mother's Name", children: teacher.parents_info.mother_name },
        {
          label: "Mother's Phone",
          children: teacher.parents_info.mother_phone,
        },
        {
          label: "Emergency Contact",
          children: teacher.parents_info.other_contact_name,
          span: 1,
        },
        {
          label: "Emergency Phone",
          children: teacher.parents_info.other_contact_phone,
          span: 2,
        },
      ]
    : [];

  // 2. Education Tab Content
  const renderEducationSection = (title: string, data: any) => {
    if (!data) return null;
    return (
      <Card title={title} size="small" className="mb-4 shadow-sm">
        <Descriptions bordered size="small" column={{ xs: 1, sm: 2, md: 3 }}>
          {Object.entries(data).map(([key, value]) => {
            if (typeof value === "object" || value === undefined) return null;
            return (
              <Descriptions.Item
                key={key}
                label={key.replace(/_/g, " ").toUpperCase()}
              >
                {typeof value === "boolean"
                  ? value
                    ? "Yes"
                    : "No"
                  : String(value)}
              </Descriptions.Item>
            );
          })}
        </Descriptions>
      </Card>
    );
  };

  // 3. Tutoring Preferences Content
  const pref = teacher.preferred_tutoring;
  const loc = teacher.preferred_teaching_locations;

  // Tab Items Array
  const tabItems = [
    {
      key: "1",
      label: "Personal Profile",
      children: (
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4 border-b pb-4">
            <Avatar
              size={80}
              src={teacher.profile_picture}
              className="bg-blue-500 font-bold"
            >
              {teacher.full_name.charAt(0).toUpperCase()}
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">{teacher.full_name}</h2>
              <p className="text-gray-500">
                Experience: {teacher.years_of_experience || 0} Years
              </p>
              {teacher.about_me && (
                <p className="text-gray-600 mt-1 italic">
                  "{teacher.about_me}"
                </p>
              )}
            </div>
          </div>
          <Descriptions
            title="Basic Details"
            bordered
            items={personalItems}
            column={{ xs: 1, sm: 2, md: 3 }}
            size="small"
          />
          {teacher.parents_info && (
            <Descriptions
              title="Family & Emergency Info"
              bordered
              items={parentItems}
              column={{ xs: 1, sm: 2, md: 3 }}
              size="small"
            />
          )}
        </div>
      ),
    },
    {
      key: "2",
      label: "Education Background",
      children: (
        <div className="max-h-125 overflow-y-auto pr-2">
          {renderEducationSection(
            "School / Secondary Education",
            teacher.education.school,
          )}
          {renderEducationSection(
            "College / Higher Secondary Education",
            teacher.education.college,
          )}

          {renderEducationSection(
            "Graduation / Undergrad Details",
            teacher.education.graduation,
          )}

          {renderEducationSection(
            "Post Graduation Details",
            teacher.education.post_graduation,
          )}
        </div>
      ),
    },
    {
      key: "3",
      label: "Tutoring Preferences",
      children: (
        <Space direction="vertical" className="w-full" size="middle">
          {loc && (
            <Descriptions
              title="Preferred Locations"
              bordered
              column={1}
              size="small"
            >
              <Descriptions.Item label="Country & City">
                {loc.city}, {loc.country}
              </Descriptions.Item>
              <Descriptions.Item label="Preferred Areas">
                <div className="flex flex-wrap gap-1">
                  {loc.area.map((a) => (
                    <Tag color="blue" key={a}>
                      {a}
                    </Tag>
                  ))}
                </div>
              </Descriptions.Item>
            </Descriptions>
          )}

          {pref && (
            <Descriptions
              title="Teaching Info"
              bordered
              column={1}
              size="small"
            >
              <Descriptions.Item label="Categories">
                <div className="flex flex-wrap gap-1">
                  {pref.categories.map((c) => (
                    <Tag color="purple" key={c}>
                      {c}
                    </Tag>
                  ))}
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="Courses">
                <div className="flex flex-wrap gap-1">
                  {pref.courses.map((c) => (
                    <Tag color="cyan" key={c}>
                      {c}
                    </Tag>
                  ))}
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="Subjects">
                <div className="flex flex-wrap gap-1">
                  {pref.subjects.map((s) => (
                    <Tag color="geekblue" key={s}>
                      {s}
                    </Tag>
                  ))}
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="Tutoring Types">
                <div className="flex flex-wrap gap-1">
                  {pref.tutoring_types.map((t) => (
                    <Tag color="magenta" key={t}>
                      {t}
                    </Tag>
                  ))}
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="Expected Salary Range">
                <strong className="text-green-600">
                  {pref.salary_range?.min} - {pref.salary_range?.max}
                </strong>
              </Descriptions.Item>
            </Descriptions>
          )}

          {teacher.tutoring_availability && (
            <Descriptions title="Availability" bordered size="small">
              <Descriptions.Item label="Available Days">
                <div className="flex flex-wrap gap-1">
                  {teacher.tutoring_availability.days.map((day) => (
                    <Tag color="orange" key={day}>
                      {day}
                    </Tag>
                  ))}
                </div>
              </Descriptions.Item>
            </Descriptions>
          )}
        </Space>
      ),
    },
    {
      key: "4",
      label: "Verification & Status",
      children: (
        <div className="flex flex-col gap-6">
          <Descriptions
            title="System Status"
            bordered
            column={{ xs: 1, sm: 3 }}
            size="small"
          >
            <Descriptions.Item label="Verification Status">
              {teacher.is_verified ? (
                <Tag icon={<CheckCircleOutlined />} color="success">
                  Verified
                </Tag>
              ) : (
                <Tag icon={<CloseCircleOutlined />} color="error">
                  Unverified
                </Tag>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Profile Progress">
              <Tag
                color={
                  teacher.profile_completion?.is_completed ? "green" : "warning"
                }
              >
                {teacher.profile_completion?.percentage}% Completed
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Account Activity">
              {teacher.is_active ? (
                <Tag color="green">Active</Tag>
              ) : (
                <Tag color="red">Inactive</Tag>
              )}
            </Descriptions.Item>
          </Descriptions>

          {teacher.identification && (
            <div>
              <h3 className="text-base font-semibold mb-2">
                Identification Documents (
                {teacher?.identification?.type?.toUpperCase()})
              </h3>
              <p className="mb-2 text-gray-600">
                ID Number: <strong>{teacher.identification.number}</strong>
              </p>
              <div className="flex gap-4 flex-wrap">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Front Image</p>
                  <Image
                    width={200}
                    src={teacher.identification.front_image}
                    className="rounded border object-cover h-32"
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Back Image</p>
                  <Image
                    width={200}
                    src={teacher.identification.back_image}
                    className="rounded border object-cover h-32"
                  />
                </div>
              </div>
            </div>
          )}

          {teacher.certifications && teacher.certifications.length > 0 && (
            <div>
              <h3 className="text-base font-semibold mb-2">Certifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {teacher.certifications.map((cert, index) => (
                  <Card key={index} size="small" title={cert.type}>
                    <a
                      href={cert.certificate_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View Certificate Document
                    </a>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      ),
    },
  ];

  return <Tabs defaultActiveKey="1" items={tabItems} className="w-full" />;
}

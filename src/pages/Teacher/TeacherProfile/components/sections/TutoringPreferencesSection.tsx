import { Card, Col, Descriptions, Empty, Row, Statistic, Tag } from "antd";
import {
  DollarOutlined,
  CalendarOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import type { TTeacher } from "../../../../../types/teacher.types";
import { safeRender } from "../../../../../utils/format";

type TutoringPreferencesSectionProps = {
  teacher: TTeacher;
};

const TutoringPreferencesSection = ({
  teacher,
}: TutoringPreferencesSectionProps) => {
  const prefs = teacher?.preferred_tutoring;
  const locs = teacher?.preferred_teaching_locations;

  // Early return if no preferences or locations exist at all
  if (!prefs && !locs) {
    return (
      <Card title="Tutoring Preferences" className="shadow-sm border-gray-100">
        <Empty description="No tutoring preferences configured yet." />
      </Card>
    );
  }

  // Helper for Salary display
  const min = prefs?.salary_range?.min;
  const max = prefs?.salary_range?.max;
  const salaryDisplay =
    min !== undefined || max !== undefined
      ? `${min ?? 0} - ${max ?? 0}`
      : "N/A";

  return (
    <Card title="Tutoring Preferences" className="shadow-sm border-gray-100">
      <div className="space-y-6">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Card size="small" className="bg-blue-50/40">
              <Statistic
                title="Expected Salary Range"
                value={salaryDisplay}
                prefix={<DollarOutlined />}
                suffix="/ Month"
              />
            </Card>
          </Col>
          <Col xs={24} sm={12}>
            <Card size="small" className="bg-teal-50/40">
              <div className="text-gray-400 text-sm mb-1">
                Years of Teaching Experience
              </div>
              <div className="font-medium text-lg text-gray-800 flex items-center gap-1">
                <HistoryOutlined className="text-teal-600!" />
                {safeRender(teacher?.years_of_experience, "0")} Years
              </div>
            </Card>
          </Col>
        </Row>

        <div className="space-y-6!">
          <Descriptions
            labelStyle={{ width: 200 }}
            column={1}
            layout="horizontal"
            bordered
            size="small"
          >
            <Descriptions.Item label="Preferred Categories">
              <div className="flex flex-wrap gap-1">
                {prefs?.categories?.length
                  ? prefs.categories.map((cat, i) => (
                      <Tag key={i} color="blue">
                        {cat}
                      </Tag>
                    ))
                  : "N/A"}
              </div>
            </Descriptions.Item>

            <Descriptions.Item label="Preferred Courses">
              <div className="flex flex-wrap gap-1">
                {prefs?.courses?.length
                  ? prefs.courses.map((course, i) => (
                      <Tag key={i} color="purple">
                        {course}
                      </Tag>
                    ))
                  : "N/A"}
              </div>
            </Descriptions.Item>

            <Descriptions.Item label="Preferred Subjects">
              <div className="flex flex-wrap gap-1">
                {prefs?.subjects?.length
                  ? prefs.subjects.map((sub, i) => (
                      <Tag key={i} color="geekblue">
                        {sub}
                      </Tag>
                    ))
                  : "N/A"}
              </div>
            </Descriptions.Item>

            <Descriptions.Item label="Tutoring Types">
              <div className="flex flex-wrap gap-1">
                {prefs?.tutoring_types?.length
                  ? prefs.tutoring_types.map((type, i) => (
                      <Tag key={i} color="cyan" className="capitalize">
                        {type}
                      </Tag>
                    ))
                  : "N/A"}
              </div>
            </Descriptions.Item>

            <Descriptions.Item
              label={`Weekly Availability - ${teacher.tutoring_availability?.days?.length ?? 0} Days`}
            >
              <div className="flex flex-wrap gap-1">
                {teacher?.tutoring_availability?.days?.length
                  ? teacher.tutoring_availability.days.map((day, i) => (
                      <Tag
                        key={i}
                        color="success"
                        icon={<CalendarOutlined />}
                        className="capitalize"
                      >
                        {day}
                      </Tag>
                    ))
                  : "N/A"}
              </div>
            </Descriptions.Item>
          </Descriptions>

          <Descriptions
            labelStyle={{ width: 200 }}
            column={1}
            layout="horizontal"
            bordered
            size="small"
          >
            <Descriptions.Item label="Preferred Country">
              <div className="flex flex-wrap gap-1">
                {safeRender(locs?.country)}
              </div>
            </Descriptions.Item>
            <Descriptions.Item label="Preferred City">
              <div className="flex flex-wrap gap-1">
                {safeRender(locs?.city)}
              </div>
            </Descriptions.Item>

            <Descriptions.Item label="Preferred Areas">
              <div className="flex flex-wrap gap-1">
                {locs?.area?.length
                  ? locs.area.map((area, i) => (
                      <Tag key={i} color="orange">
                        {area}
                      </Tag>
                    ))
                  : "N/A"}
              </div>
            </Descriptions.Item>
          </Descriptions>
        </div>
      </div>
    </Card>
  );
};

export default TutoringPreferencesSection;

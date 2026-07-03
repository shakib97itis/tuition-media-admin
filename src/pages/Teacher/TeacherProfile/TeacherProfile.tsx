import { Row, Col } from "antd";
import moment from "moment";
import ProfileSummaryCard from "./components/sections/ProfileSummaryCard";
import OverviewSection from "./components/sections/OverviewSection";
import TutoringPreferencesSection from "./components/sections/TutoringPreferencesSection";
import EducationDetailsSection from "./components/sections/EducationDetailsSection";
import VerificationDocsSection from "./components/sections/VerificationDocsSection";
import { mockTeacherData } from "../../../utils/mockTeacherData";

/**
 * Formats standard date objects or ISO strings into readable "Month Day, Year" layout.
 * Falls back to "N/A" if the incoming date value is empty, null, or invalid.
 *
 * @param date - Date object, ISO string, or undefined value from API response
 * @returns Formatted date string or fallback marker
 */
export const formatDate = (date: Date | string | undefined): string => {
  if (!date) return "N/A";

  const momentDate = moment(date);
  return momentDate.isValid() ? momentDate.format("MMMM D, YYYY") : "N/A";
};

/**
 * TeacherProfile Dashboard Parent Component.
 * Orchestrates the rendering grid layout and passes teacher domain data
 * down to dedicated profile section micro-components.
 */
const TeacherProfile = () => {
  // Utilizing the strongly typed mock profile configuration
  const teacher = mockTeacherData;

  // const { teacherId } = useParams();
  // const { data, isLoading, isError } = useGetTeacherQuery(teacherId);
  // console.log(data);

  return (
    <main className="p-4 max-w-7xl mx-auto w-full">
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={24} xl={24}>
          <div className="space-y-6!">
            <ProfileSummaryCard teacher={teacher} />
            <OverviewSection teacher={teacher} />
            <TutoringPreferencesSection teacher={teacher} />
            <EducationDetailsSection teacher={teacher} />
            <VerificationDocsSection teacher={teacher} />
          </div>
        </Col>
      </Row>
    </main>
  );
};

export default TeacherProfile;

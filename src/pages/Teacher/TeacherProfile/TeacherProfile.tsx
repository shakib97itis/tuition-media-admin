import { Row, Col, Spin, Result } from "antd";
import { useParams } from "react-router-dom";
import { useGetTeacherQuery } from "../../../redux/features/teacher/teacherApi";
import type { TTeacher } from "../../../types/teacher.types";

import ProfileSummaryCard from "./components/sections/ProfileSummaryCard";
import OverviewSection from "./components/sections/OverviewSection";
import TutoringPreferencesSection from "./components/sections/TutoringPreferencesSection";
import EducationDetailsSection from "./components/sections/EducationDetailsSection";
import VerificationDocsSection from "./components/sections/VerificationDocsSection";

const TeacherProfile = () => {
  const { teacherId } = useParams<{ teacherId: string }>();
  const { data, isLoading, isError } = useGetTeacherQuery(teacherId, {
    skip: !teacherId,
  });

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" description="Loading profile..." />
      </div>
    );
  }

  // 2. Error or Empty State
  if (isError || !data?.results) {
    return (
      <Result
        status="error"
        title="Unable to load profile"
        subTitle="The teacher profile could not be retrieved. Please check the ID or try again."
      />
    );
  }

  // 3. Cast to our defined Type
  const teacher = data.results as TTeacher;

  return (
    <main className="p-4 max-w-7xl mx-auto w-full">
      <Row gutter={[24, 24]}>
        <Col span={24}>
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

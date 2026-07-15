import { Avatar, Button, Card, Progress, Tag } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  BookOutlined,
  SafetyCertificateOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import type { TTeacher } from "../../../../../types/teacher.types";
import { safeRender } from "../../../../../utils/format";

type ProfileSummaryCardProps = {
  teacher: TTeacher;
};

const ProfileSummaryCard = ({ teacher }: ProfileSummaryCardProps) => {
  const navigate = useNavigate();
  const completionPercentage = teacher.profile_completion?.percentage ?? 0;

  return (
    <Card className="shadow-sm border-gray-100 w-full transition-all duration-300">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <Avatar
            size={100}
            src={teacher.profile_picture}
            icon={<UserOutlined />}
            className="border-4 border-blue-50 shadow-sm object-cover shrink-0"
          />

          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mt-4 mb-0 truncate">
            {safeRender(teacher.full_name, "No Name Provided")}
          </h2>

          <p className="text-sm text-gray-400 capitalize mb-3">
            {safeRender(teacher.role, "Teacher")}
          </p>

          <div className="flex flex-wrap justify-center gap-1.5">
            <Tag
              color={teacher.is_verified ? "success" : "error"}
              className="m-0 flex items-center gap-1 text-xs"
              icon={
                teacher.is_verified ? (
                  <CheckCircleOutlined />
                ) : (
                  <CloseCircleOutlined />
                )
              }
            >
              {teacher.is_verified ? "Verified" : "Unverified"}
            </Tag>

            <Tag
              color={teacher.is_active ? "processing" : "default"}
              className="m-0 text-xs"
            >
              {teacher.is_active ? "Active" : "Inactive"}
            </Tag>
          </div>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-gray-100">
          {/* Left */}
          <div className="md:col-span-2 border-b md:border-b-0 md:border-r border-gray-100">
            {/* Contact */}
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-600">
                <div className="flex items-center gap-3 min-w-0">
                  <MailOutlined className="text-gray-400 shrink-0 text-base" />
                  <span className="truncate text-sm" title={teacher.email}>
                    {safeRender(teacher.email, "No email provided")}
                  </span>
                </div>

                <div className="flex items-center gap-3 min-w-0">
                  <PhoneOutlined className="text-gray-400 shrink-0 text-base" />
                  <span className="text-sm truncate">
                    {safeRender(teacher.phone)}
                  </span>
                </div>

                {teacher.years_of_experience !== undefined && (
                  <div className="flex items-center gap-3 min-w-0">
                    <BookOutlined className="text-gray-400 shrink-0 text-base" />
                    <span className="text-sm truncate">
                      {teacher.years_of_experience} Years of Teaching Experience
                    </span>
                  </div>
                )}

                {teacher.additional_phone && (
                  <div className="flex items-center gap-3 min-w-0">
                    <PhoneOutlined className="text-gray-400 shrink-0 text-base" />
                    <span className="text-sm truncate">
                      {safeRender(teacher.additional_phone)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Progress */}
            <div className="border-t border-gray-100 p-6">
              <div className="flex justify-between items-center mb-1.5 text-xs sm:text-sm text-gray-500">
                <span>Profile Completion</span>

                <span className="font-semibold text-[#355F92]">
                  {completionPercentage}%
                </span>
              </div>

              <Progress
                percent={completionPercentage}
                showInfo={false}
                strokeColor="#355F92"
                strokeWidth={6}
                className="m-0"
              />
            </div>
          </div>

          {/* Right */}
          <div className="p-6 flex flex-col gap-2">
            <Button
              type="primary"
              icon={<EditOutlined />}
              className="w-full bg-[#355F92] hover:bg-[#2a4c75] border-none h-9 text-sm flex items-center justify-center gap-1"
              onClick={() =>
                navigate(`/super_admin/teacher/edit/${teacher._id}`)
              }
            >
              Update Profile
            </Button>

            <Button
              type="primary"
              icon={
                teacher.is_active ? (
                  <CloseCircleOutlined />
                ) : (
                  <CheckCircleOutlined />
                )
              }
              danger={teacher.is_active}
              className="w-full bg-[#355F92] hover:bg-[#2a4c75] border-none h-9 text-sm flex items-center justify-center gap-1"
            >
              {teacher.is_active ? "Deactivate Account" : "Activate Account"}
            </Button>

            <Button
              type="default"
              icon={<SafetyCertificateOutlined />}
              className="w-full border-gray-300 hover:border-[#355F92] hover:text-[#355F92] h-9 text-sm flex items-center justify-center gap-1"
            >
              {teacher.is_verified ? "Unverify Profile" : "Verify Profile"}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileSummaryCard;

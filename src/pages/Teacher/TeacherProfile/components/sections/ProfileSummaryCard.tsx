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
    <Card
      className="shadow-sm border-gray-100 w-full transition-all duration-300"
      bodyStyle={{ padding: "24px" }}
    >
      <div className="flex flex-col md:flex-row items-center md:items-center gap-6 w-full">
        {/* Left Section: Avatar & Identity */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left shrink-0 w-full md:w-auto md:max-w-60">
          <div className="flex flex-col sm:flex-row md:flex-col items-center gap-4 w-full">
            <Avatar
              size={{ xs: 80, sm: 90, md: 100, lg: 100, xl: 100, xxl: 100 }}
              src={teacher.profile_picture}
              icon={<UserOutlined />}
              className="border-4 border-blue-50 shadow-sm object-cover shrink-0"
            />
            <div className="min-w-0 w-full">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 m-0 truncate">
                {safeRender(teacher.full_name, "No Name Provided")}
              </h2>
              <p className="text-sm text-center text-gray-400 capitalize mb-2 md:mb-3">
                {safeRender(teacher.role, "Teacher")}
              </p>
              {/* Status Badges */}
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
          </div>
        </div>

        {/* Center Section: Details & Metrics */}
        <div className="flex-1 w-full flex flex-col justify-center border-t md:border-t-0 md:border-l md:border-r border-gray-100 pt-6 md:pt-0 md:px-6 space-y-4">
          {/* Primary Contact Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-600">
            <div className="flex items-center gap-3 min-w-0">
              <MailOutlined className="text-gray-400 shrink-0 text-base" />
              <span className="truncate text-sm w-full" title={teacher.email}>
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

          {/* Profile Completion Bar */}
          <div className="w-full pt-2">
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

        {/* Right Section: Action Triggers */}
        <div className="shrink-0 w-full md:w-45 flex flex-col justify-center gap-2 border-t md:border-t-0 border-gray-100 pt-6 md:pt-0">
          <Button
            type="primary"
            icon={<EditOutlined />}
            className="w-full bg-[#355F92] hover:bg-[#2a4c75] border-none h-9 text-sm flex items-center justify-center gap-1"
            onClick={() => navigate(`/super_admin/teacher/edit/${teacher._id}`)}
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
    </Card>
  );
};

export default ProfileSummaryCard;

// * Old vertical ProfileSummaryCard. We can utilize it later if needed.

// const ProfileSummaryCard: React.FC<
//   SubComponentProps & { onEdit: () => void }
// > = ({ teacher, onEdit }) => {
//   const completionPercentage = teacher.profile_completion?.percentage ?? 0;

//   return (
//     <Card className="shadow-sm border-gray-100 flex flex-col items-center text-center w-full">
//       {/* Avatar and Identity */}
//       <div className="flex flex-col items-center mb-4">
//         <Avatar
//           size={120}
//           src={teacher.profile_picture}
//           icon={<UserOutlined />}
//           className="border-4 border-blue-50 shadow-sm object-cover mb-3"
//         />
//         <h2 className="text-xl font-bold text-gray-800 m-0">
//           {teacher.full_name ?? "No Name Provided"}
//         </h2>
//         <p className="text-gray-400 capitalize mb-2">
//           {teacher.role ?? "Teacher"}
//         </p>

//         {/* Dynamic Status Badges */}
//         <div className="flex flex-wrap justify-center gap-1.5 mb-4">
//           <Tag
//             color={teacher.is_verified ? "success" : "error"}
//             icon={
//               teacher.is_verified ? (
//                 <CheckCircleOutlined />
//               ) : (
//                 <CloseCircleOutlined />
//               )
//             }
//           >
//             {teacher.is_verified ? "Verified" : "Unverified"}
//           </Tag>
//           <Tag color={teacher.is_active ? "processing" : "default"}>
//             {teacher.is_active ? "Active" : "Inactive"}
//           </Tag>
//         </div>
//       </div>

//       {/* Profile Completion Metrics */}
//       <div className="w-full border-t border-gray-100 pt-4 mb-4">
//         <div className="flex justify-between items-center mb-1 text-sm text-gray-500">
//           <span>Profile Completion</span>
//           <span className="font-semibold text-blue-600">
//             {completionPercentage}%
//           </span>
//         </div>
//         <Progress
//           percent={completionPercentage}
//           showInfo={false}
//           strokeColor="#355F92"
//         />
//       </div>

//       {/* Primary Contact Details */}
//       <div className="w-full text-left space-y-3 pt-2 text-gray-600 border-t border-gray-100 pt-4 mb-5">
//         <div className="flex items-center gap-3">
//           <MailOutlined className="text-gray-400 shrink-0" />
//           <span className="truncate text-sm" title={teacher.email}>
//             {teacher.email}
//           </span>
//         </div>
//         <div className="flex items-center gap-3">
//           <PhoneOutlined className="text-gray-400 shrink-0" />
//           <span className="text-sm">{teacher.phone ?? "N/A"}</span>
//         </div>
//         {teacher.years_of_experience !== undefined && (
//           <div className="flex items-center gap-3">
//             <BookOutlined className="text-gray-400 shrink-0" />
//             <span className="text-sm">
//               {teacher.years_of_experience} Years Experience
//             </span>
//           </div>
//         )}
//       </div>

//       {/* Main Action Triggers */}
//       <div className="w-full space-y-2">
//         <Button
//           type="primary"
//           icon={<EditOutlined />}
//           className="w-full bg-[#355F92] hover:bg-[#2a4c75]"
//           onClick={onEdit}
//         >
//           Update Profile
//         </Button>

//         <Button
//           type="primary"
//           icon={<EditOutlined />}
//           className="w-full bg-[#355F92] hover:bg-[#2a4c75]"
//           onClick={onEdit}
//         >
//           Verify Profile
//         </Button>

//         <Button
//           type="primary"
//           icon={<EditOutlined />}
//           className="w-full bg-[#355F92] hover:bg-[#2a4c75]"
//           onClick={onEdit}
//         >
//           Verify Profile
//         </Button>
//       </div>
//     </Card>
//   );
// };

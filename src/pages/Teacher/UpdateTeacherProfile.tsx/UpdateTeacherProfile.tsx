import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { mockTeacherData } from "../../../utils/mockTeacherData";
import UpdateTeacherProfileForm from "./components/UpdateTeacherProfileForm";

const UpdateTeacherProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const teacher = mockTeacherData;

  const onFinish = async (values: any) => {
    setIsLoading(true);
    try {
      // todo: Normalizing data conversions to conform to raw MongoDB expectations before submitting
      const parsedValues = {
        ...values,
        date_of_birth: values.date_of_birth
          ? values.date_of_birth.format("YYYY-MM-DD")
          : undefined,
        identification: {
          ...values.identification,
          // Extract file URL strings out of the AntD standard dynamic upload lists
          front_image:
            values.identification?.front_image?.[0]?.url ||
            values.identification?.front_image?.[0]?.originFileObj ||
            "",
          back_image:
            values.identification?.back_image?.[0]?.url ||
            values.identification?.back_image?.[0]?.originFileObj ||
            "",
        },
        certifications: values.certifications?.map((cert: any) => ({
          type: cert.type,
          certificate_url:
            cert.file?.[0]?.url || cert.file?.[0]?.originFileObj || "",
        })),
      };

      console.log("Sanitized Mongoose Payload Submitted: ", parsedValues);
      navigate(-1);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="@container w-full max-w-6xl mx-auto p-3 @sm:p-6 bg-gray-50/30 min-h-screen">
      
      <div className="flex flex-col @md:flex-row justify-between items-start @md:items-center gap-4 mb-6 pb-4 border-b border-gray-200">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
          className="w-full @md:w-auto"
        >
          Cancel & Return
        </Button>
        <div className="w-full @md:w-auto text-left @md:text-right">
          <h1 className="text-lg @sm:text-xl font-bold text-gray-800 m-0">
            Update Teacher Profile
          </h1>
        </div>
      </div>

      <UpdateTeacherProfileForm
        initialData={teacher}
        onFinish={onFinish}
        isLoading={isLoading}
      />
    </div>
  );
};

export default UpdateTeacherProfile;

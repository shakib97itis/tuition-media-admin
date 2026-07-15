import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import UpdateTeacherProfileForm from "./components/UpdateTeacherProfileForm";
import {
  useGetTeacherQuery,
  useUpdateTeacherMutation,
} from "../../../redux/features/teacher/teacherApi";

const UpdateTeacherProfile = () => {
  const navigate = useNavigate();
  const { teacherId } = useParams();

  const { data, isLoading: isFetching } = useGetTeacherQuery(teacherId);
  const [updateTeacher, { isLoading: isUpdating }] = useUpdateTeacherMutation();

  const teacher = data?.results;
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    console.log(values);
    // todo: upload images.
    // todo: save the values to database.
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="@container w-full max-w-6xl mx-auto p-3 @sm:p-6 bg-gray-50/30 min-h-screen">
      <div className="flex flex-col @md:flex-row justify-between items-start @md:items-center gap-4 mb-6 pb-4 border-b border-gray-200">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={handleCancel}
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
        form={form}
        initialData={teacher}
        onFinish={onFinish}
        isLoading={isFetching || isUpdating}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default UpdateTeacherProfile;

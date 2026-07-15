import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Spin } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import dayjs from "dayjs";

import UpdateTeacherProfileForm from "./components/UpdateTeacherProfileForm";
import {
  useGetTeacherQuery,
  useUpdateTeacherMutation,
} from "../../../redux/features/teacher/teacherApi";

const UpdateTeacherProfile = () => {
  const navigate = useNavigate();
  const { teacherId } = useParams<{ teacherId: string }>();
  const [form] = Form.useForm();

  // RTK Query hooks
  const { data, isLoading: isFetching } = useGetTeacherQuery(teacherId, {
    skip: !teacherId,
  });

  const [updateTeacher, { isLoading: isUpdating, isSuccess, isError, error }] =
    useUpdateTeacherMutation();

  const teacher = data?.results;

  // Sync form values when data arrives
  useEffect(() => {
    if (teacher) {
      // Map initial data to form field values, converting date strings to dayjs objects
      form.setFieldsValue({
        ...teacher,
        date_of_birth: teacher.date_of_birth
          ? dayjs(teacher.date_of_birth)
          : null,
        // Map dynamic lists such as certifications if they contain files
        certifications: teacher.certifications?.map((cert) => ({
          type: cert.type,
          file: cert.certificate_url
            ? [
                {
                  uid: "-1",
                  name: "Attached Certificate",
                  status: "done",
                  url: cert.certificate_url,
                },
              ]
            : [],
        })),
        identification: {
          ...teacher.identification,
          front_image: teacher.identification?.front_image
            ? [
                {
                  uid: "-1",
                  name: "Front Copy",
                  status: "done",
                  url: teacher.identification.front_image,
                },
              ]
            : [],
          back_image: teacher.identification?.back_image
            ? [
                {
                  uid: "-1",
                  name: "Back Copy",
                  status: "done",
                  url: teacher.identification.back_image,
                },
              ]
            : [],
        },
      });
    }
  }, [teacher, form]);

  // Handle Success & Error feedback
  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "The teacher's profile has been updated successfully.",
        confirmButtonText: "OK",
      }).then(() => {
        navigate(-1);
      });
    }

    if (isError) {
      const errorMessage =
        (error as any)?.data?.message || "Something went wrong.";
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: errorMessage,
      });
    }
  }, [isSuccess, isError, error, navigate]);

  const onFinish = (values: any) => {
    // Format payload
    const payload = {
      ...values,
      date_of_birth: values.date_of_birth
        ? values.date_of_birth.format("YYYY-MM-DD")
        : null,
    };

    // Remove client-side only fields that shouldn't go to the API
    delete payload.certifications;
    delete payload.identification;

    // console.log(payload);

    updateTeacher({ id: teacherId, body: payload });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" description="Loading profile..." />
      </div>
    );
  }

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
        isLoading={isUpdating}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default UpdateTeacherProfile;

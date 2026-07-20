import { useEffect, useMemo } from "react";
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
import { baseUrl } from "../../../config";

const UpdateTeacherProfile = () => {
  const navigate = useNavigate();
  const { teacherId } = useParams<{ teacherId: string }>();
  const [form] = Form.useForm();

  const { data, isLoading: isFetching } = useGetTeacherQuery(teacherId);
  const [updateTeacher, { isLoading: isUpdating, isSuccess, isError, error }] =
    useUpdateTeacherMutation();

  const teacher = data?.results;

  // Memoize transformation logic to prevent unnecessary re-renders
  const formattedInitialValues = useMemo(() => {
    if (!teacher) return {};
    return {
      ...teacher,
      date_of_birth: teacher.date_of_birth
        ? dayjs(teacher.date_of_birth)
        : null,
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
    };
  }, [teacher]);

  // Sync form values
  useEffect(() => {
    if (teacher) {
      form.setFieldsValue(formattedInitialValues);
    }
  }, [teacher, formattedInitialValues, form]);

  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Successfully updated.",
      }).then(() => navigate(-1));
    }
    if (isError) {
      const errMsg = (error as any)?.data?.message || "Something went wrong.";
      Swal.fire({ icon: "error", title: "Update Failed", text: errMsg });
    }
  }, [isSuccess, isError, error, navigate]);

  // * Image upload has some issues need some fix.
  const onFinish = async (values: any) => {
    try {
      // 1. Prepare FormData
      const formData = new FormData();

      // Append Certifications
      values.certifications.forEach((cert: any) => {
        formData.append("images", cert.file[0].originFileObj);
      });

      // Append ID Images
      formData.append(
        "images",
        values.identification.front_image[0].originFileObj,
      );
      formData.append(
        "images",
        values.identification.back_image[0].originFileObj,
      );

      // 2. Upload Files
      const res = await fetch(`${baseUrl.BASE_URL}/media-upload/multiple`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("File upload failed");

      const response = await res.json();
      // Extracting the flat list of URLs: ["url1", "url2", "url3"...]
      const imageUrls = response.results.map((item: any) => item.imageUrl);

      // 3. Construct Payload
      const certsCount = values.certifications?.length || 0;

      const payload = {
        ...values,
        date_of_birth: values.date_of_birth?.format("YYYY-MM-DD") || null,

        // Reconstruct Certifications
        certifications: values.certifications.map(
          (cert: any, index: number) => ({
            type: cert.type || "certificate",
            certificate_url: imageUrls[index],
          }),
        ),

        // Reconstruct Identification
        identification: {
          ...values.identification,
          front_image: imageUrls[certsCount], // URL immediately following certs
          back_image: imageUrls[certsCount + 1], // Last URL
        },
      };

      // 4. Update the Teacher
      await updateTeacher({ id: teacherId, body: payload });

      console.log("Teacher profile updated successfully:", payload);
    } catch (err) {
      console.error("Submission failed:", err);
      // Add your UI error handling here (e.g., message.error("Update failed"))
    }
  };

  if (isFetching)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );

  return (
    <div className="@container w-full max-w-6xl mx-auto p-3 @sm:p-6 bg-gray-50/30 min-h-screen">
      <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
          Cancel & Return
        </Button>
        <h1 className="text-xl font-bold">Update Teacher Profile</h1>
      </div>

      <UpdateTeacherProfileForm
        form={form}
        initialData={formattedInitialValues}
        onFinish={onFinish}
        isLoading={isUpdating}
        onCancel={() => navigate(-1)}
      />
    </div>
  );
};

export default UpdateTeacherProfile;

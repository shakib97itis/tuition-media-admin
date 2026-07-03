// * This component is currently not in use, Keeping this for future.

import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "antd";
import type { FormInstance } from "antd";
import { CiEdit } from "react-icons/ci";
import Swal from "sweetalert2";
import type { TTeacher } from "../../../../../types/teacher.types";
import { useUpdateTeacherMutation } from "../../../../../redux/features/teacher/teacherApi";

/**
 * Shared prop definitions for child form elements running inside this modal wrapper.
 */
export interface FormElementProps {
  record: TTeacher;
  form: FormInstance;
  loading: boolean;
  onFinish: (values: any) => void;
}

type UpdateTeacherProfileModalProps = {
  record: TTeacher;
  FormElement: React.ComponentType<FormElementProps>; // Reference blueprint of the form element
  title: string;
};

const UpdateTeacherProfileModal = ({
  record,
  FormElement,
  title,
}: UpdateTeacherProfileModalProps) => {
  const [open, setModalOpen] = useState(false);
  const [form] = Form.useForm();

  // RTK Query hook managing the state of the update API mutation
  const [update, { data, isLoading, isSuccess, isError, error }] =
    useUpdateTeacherMutation();

  /**
   * Submits the updated form data paired with the document's unique ID.
   */
  const handleFinish = (values: any) => {
    update({ id: record?._id, body: values });
  };

  /**
   * Syncs the underlying AntD form fields with the parent records data layer
   * whenever the modal target shifts or opens.
   */
  useEffect(() => {
    if (open && record) {
      form.setFieldsValue(record);
    }
  }, [open, record, form]);

  /**
   * Handles visual lifecycle alerts and field cleanups upon successful mutation executions.
   */
  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        title: "Success",
        icon: "success",
        text: data?.message || "Profile updated successfully",
        showConfirmButton: false,
        timer: 1500,
        iconColor: "#0ABAC3",
      });
      setModalOpen(false);
      form.resetFields();
    }
  }, [isSuccess, data, form]);

  /**
   * Listens for backend server processing rejections and safely reads error states.
   */
  useEffect(() => {
    if (isError) {
      const errorMessage =
        (error as any)?.data?.message || "Something went wrong";
      Swal.fire({
        title: "Oops!..",
        icon: "error",
        text: errorMessage,
        confirmButtonColor: "#0ABAC3",
      });

      setModalOpen(false);
    }
  }, [isError, error]);

  return (
    <>
      <Button
        type="primary"
        onClick={() => setModalOpen(true)}
        className="w-full flex gap-2 justify-center items-center font-medium"
        style={{ height: "40px" }}
      >
        <CiEdit className="size-5" /> Edit Profile
      </Button>

      {/* Primary Operation Dialogue frame container layout configs */}
      <Modal
        width={768}
        footer={null}
        title={title}
        centered
        open={open}
        onCancel={() => setModalOpen(false)}
        destroyOnHidden
      >
        <div className="mt-4">
          <FormElement
            record={record}
            form={form}
            loading={isLoading}
            onFinish={handleFinish}
          />
        </div>
      </Modal>
    </>
  );
};

export default UpdateTeacherProfileModal;

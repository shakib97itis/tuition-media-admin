import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Button, Modal } from "antd";
import { CiEdit } from "react-icons/ci";
import JobForm from "../form/JobForm";
import { useUpdateTuitionJobByIdFromAdminMutation } from "../../../redux/features/job/jobApi";

const UpdateJobModal = ({ record }: any) => {
  const [open, setModalOpen] = useState(false);
  const [form] = useForm();
  const [update, { data, isLoading, isSuccess, isError, error }] =
    useUpdateTuitionJobByIdFromAdminMutation();

  const onFinish = (values: any) => {
    update({ id: record?._id, body: values });
  };

  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        title: "Success",
        icon: "success",
        text: `${data?.message}`,
        showConfirmButton: false,
        timer: 1500,
        iconColor: "#0ABAC3",
      });
      setModalOpen(false);
    }
    if (isError) {
      Swal.fire({
        title: "Oops!..",
        icon: "error",
        text: `${(error as any)?.data?.message || "something went wrong"}`,
        confirmButtonColor: "#0ABAC3",
      });
    }
  }, [data, isSuccess, isError, form, error]);
  return (
    <>
      <Button
        type="primary"
        size="medium"
        onClick={() => setModalOpen(true)}
        // className="w-full flex gap-1 justify-center items-center"
      >
        <CiEdit className="size-5 text-white" /> Update
      </Button>
      <Modal
        width={800}
        footer={null}
        title="Update Job"
        centered
        open={open}
        onCancel={() => setModalOpen(false)}
      >
        <div className="my-5">
          <JobForm
            record={record}
            form={form}
            loading={isLoading}
            onFinish={onFinish}
          />
        </div>
      </Modal>
    </>
  );
};

export default UpdateJobModal;

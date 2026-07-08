import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { useCreateTuitionJobByAdminMutation } from "../../../redux/features/job/jobApi";
import Swal from "sweetalert2";
import { Button, Modal } from "antd";
import JobForm from "../form/JobForm";
import { IoCreateOutline } from "react-icons/io5";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import { useAppSelector } from "../../../hooks/useAppHooks";

const CreateJobModal = ({ lead }: { lead: string }) => {
  const [open, setModalOpen] = useState(false);
  const [form] = useForm();
  const user = useAppSelector(selectCurrentUser);

  const [create, { data, isLoading, isSuccess, isError, error }] =
    useCreateTuitionJobByAdminMutation();

  const onFinish = (values: any) => {
    values.lead_from = lead;
    values.posted_by = user?._id;
    create(values);
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
      form.resetFields();
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
  const onCancel = () => {
    setModalOpen(false);
    form.resetFields();
  };
  return (
    <>
      <Button
        type="primary"
        size="medium"
        onClick={() => setModalOpen(true)}
        className="w-full flex gap-1 justify-center items-center"
      >
        <IoCreateOutline className="size-5 text-white" /> Convert Lead to Job
      </Button>
      <Modal
        width={900}
        footer={null}
        title="Create New Job"
        centered
        open={open}
        onCancel={onCancel}
      >
        <div className="my-5">
          <JobForm form={form} loading={isLoading} onFinish={onFinish} />
        </div>
      </Modal>
    </>
  );
};

export default CreateJobModal;

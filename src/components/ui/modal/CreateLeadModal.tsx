/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import Swal from "sweetalert2";
import { useCreateLeadMutation } from "../../../redux/features/lead/leadApi";
import CreateLeadForm from "../form/CreateLeadForm";

const CreateLeadModal = () => {
  const [open, setModalOpen] = useState(false);
  const [form] = useForm();
  const [createLead, { data, isLoading, isSuccess, isError, error }] =
    useCreateLeadMutation();
  const onFinish = (values: any) => {
    createLead(values);
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
      <Button onClick={() => setModalOpen(true)} type="primary" size="large">
        Create Lead
      </Button>
      <Modal
        width={800}
        footer={null}
        title="Create New Leads"
        centered
        open={open}
        onCancel={onCancel}
      >
        <div className="my-5">
          <CreateLeadForm form={form} loading={isLoading} onFinish={onFinish} />
        </div>
      </Modal>
    </>
  );
};

export default CreateLeadModal;

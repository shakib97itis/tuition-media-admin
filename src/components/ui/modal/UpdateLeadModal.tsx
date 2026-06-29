/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal } from "antd";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { CiEdit } from "react-icons/ci";
import LeadForm from "../form/LeadForm";
import { useUpdateLeadMutation } from "../../../redux/features/lead/leadApi";

const UpdateLeadModal = ({ record }: any) => {
  const [open, setModalOpen] = useState(false);
  const [form] = useForm();
  const [update, { data, isLoading, isSuccess, isError, error }] =
    useUpdateLeadMutation();
  const onFinish = (values: any) => {
    // todo: if there is followup field. then we have to create a new followup. then add the id to the value.

    if (values.newFollowUpNote) {
      delete values.newFollowUpNote;
    }

    if (values.assignedTo) {
      values.status = "assigned";
    }

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
        onClick={() => setModalOpen(true)}
        className="w-full flex gap-1 justify-center items-center"
      >
        <CiEdit className="size-5 text-white" />
        Update
      </Button>
      <Modal
        width={800}
        footer={null}
        title="Update Lead"
        centered
        open={open}
        onCancel={() => setModalOpen(false)}
      >
        <div className="my-5">
          <LeadForm
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

export default UpdateLeadModal;

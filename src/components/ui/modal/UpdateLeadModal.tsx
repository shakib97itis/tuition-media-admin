/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal } from "antd";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { CiEdit } from "react-icons/ci";
import UpdateLeadForm from "../form/UpdateLeadForm";
import { useUpdateLeadMutation } from "../../../redux/features/lead/leadApi";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";

const UpdateLeadModal = ({ record }: any) => {
  const [open, setModalOpen] = useState(false);
  const [form] = useForm();
  const [updateLead, { data, isLoading, isSuccess, isError, error }] =
    useUpdateLeadMutation();
  const currentUser = useSelector(selectCurrentUser);

  const onFinish = (values: any) => {
    const { newFollowUpNote, ...leadFields } = values;
    const body: any = { ...leadFields };
    if (newFollowUpNote && newFollowUpNote.trim() !== "") {
      body.newFollowUp = {
        note: newFollowUpNote.trim(),
        doneBy: currentUser?._id,
      };
    }
    updateLead({ id: record?._id, body });
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
      setModalOpen(false);
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
        Update Lead
      </Button>
      <Modal
        width={800}
        footer={null}
        title="Update Lead"
        centered
        open={open}
        onCancel={() => setModalOpen(false)}
        destroyOnHidden={true}
      >
        <div className="my-5">
          <UpdateLeadForm
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

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal, Spin } from "antd";
import { useEffect, useState, useMemo } from "react";
import { useForm } from "antd/es/form/Form";
import { CiEdit } from "react-icons/ci";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

import { useLeadAssignMutation } from "../../../redux/features/lead/leadApi";
import { useGetAdminUsersQuery } from "../../../redux/features/admins/adminUsersApi";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import AssignLeadForm from "../form/AssignLeadForm";

const AssignLeadModal = ({ record }: { record: any }) => {
  const [open, setModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedAdminKey, setSelectedAdminKey] = useState<string | null>(null);

  const [form] = useForm();
  const currentUser = useSelector(selectCurrentUser);

  const [assignLead, { data, isLoading, isSuccess, isError, error }] =
    useLeadAssignMutation();
  const {
    data: admins,
    isLoading: isAdminsLoading,
    isError: isAdminsError,
  } = useGetAdminUsersQuery({});

  // Synchronize state values cleanly whenever modal switches open or records update
  useEffect(() => {
    if (open) {
      const initialId =
        typeof record?.assignedTo === "object"
          ? record.assignedTo._id
          : record?.assignedTo;
      setSelectedAdminKey(initialId || null);
    }
  }, [open, record]);

  // Compute live local search parameters without re-render lag
  const filteredAdmins = useMemo(() => {
    const term = searchText.toLowerCase().trim();
    if (!term) return admins?.results || [];

    return (admins?.results || []).filter(
      (admin: any) =>
        admin.full_name?.toLowerCase().includes(term) ||
        admin.phone?.includes(term),
    );
  }, [admins?.results, searchText]);

  const onFinish = () => {
    if (!selectedAdminKey) {
      Swal.fire({
        title: "Validation Error",
        text: "Please select an admin from the list to assign!",
        icon: "warning",
        confirmButtonColor: "#0ABAC3",
      });
      return;
    }

    const fallbackReferredBy =
      typeof record?.referredBy === "object"
        ? record.referredBy._id
        : record?.referredBy;

    const payload = {
      assignedTo: selectedAdminKey,
      referredBy: currentUser?._id || fallbackReferredBy,
    };

    assignLead({ id: record?._id, body: payload });
  };

  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        title: "Success",
        icon: "success",
        text: `${data?.message || "Lead assignment updated successfully"}`,
        showConfirmButton: false,
        timer: 1500,
        iconColor: "#0ABAC3",
      });
      setModalOpen(false);
      setSearchText("");
    }
    if (isError) {
      Swal.fire({
        title: "Oops!..",
        icon: "error",
        text: `${(error as any)?.data?.message || "something went wrong"}`,
        confirmButtonColor: "#0ABAC3",
      });
    }
  }, [data, isSuccess, isError, error]);

  const onCancel = () => {
    setModalOpen(false);
    setSearchText("");
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => setModalOpen(true)}
        className="w-full flex gap-1 justify-center items-center"
      >
        <CiEdit className="size-5 text-white" />
        Assign Lead
      </Button>

      <Modal
        width={800}
        footer={null}
        title="Update Lead Assignment"
        centered
        open={open}
        onCancel={onCancel}
        destroyOnHidden
      >
        <div className="my-5">
          <Spin spinning={isAdminsLoading}>
            {isAdminsError ? (
              <p className="text-red-500 text-center">
                Failed to load administrators.
              </p>
            ) : (
              <AssignLeadForm
                form={form}
                loading={isLoading}
                onFinish={onFinish}
                record={record}
                adminsList={filteredAdmins}
                searchText={searchText}
                setSearchText={setSearchText}
                selectedAdminKey={selectedAdminKey}
                setSelectedAdminKey={setSelectedAdminKey}
              />
            )}
          </Spin>
        </div>
      </Modal>
    </>
  );
};

export default AssignLeadModal;
